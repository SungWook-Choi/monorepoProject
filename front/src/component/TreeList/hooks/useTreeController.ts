import {useCallback, useEffect, useMemo, useState} from 'react';
import type {Key} from 'react';
import type {TreeProps} from 'rc-tree';
import type {DataNode} from 'rc-tree/lib/interface';
import type {
  BranchNode,
  FlatTreeNode,
  TreeFilterResult,
  TreeNode,
  TreeNodeSelection,
} from '../types';

// TreeList가 반환해야 하는 상태/헨들러 묶음
type UseTreeControllerResult = {
  treeData: DataNode[];
  expandedKeys: Key[];
  selectedKeys: Key[];
  searchValue: string;
  filteredResults: TreeFilterResult[];
  selectedBranch: BranchNode | null;
  selectedPathLabel: string;
  onExpand: NonNullable<TreeProps['onExpand']>;
  onSelect: NonNullable<TreeProps['onSelect']>;
  onFilterSelect: (id: Key) => void;
  onSearchChange: (nextValue: string) => void;
  clearSearch: () => void;
};

// TreeNode[] -> rc-tree가 요구하는 DataNode[]로 변환
const buildTreeData = (nodes: TreeNode[]): DataNode[] =>
  nodes.map((node) => ({
    key: node.id,
    title: node.label,
    children: node.children ? buildTreeData(node.children) : undefined,
  }));

// 검색 결과/선택 경로 계산에 쓰기 위해 모든 노드를 평탄화
const flattenTree = (nodes: TreeNode[], parentPath: string[] = []): FlatTreeNode[] =>
  nodes.flatMap((node) => {
    const currentPath = [...parentPath, node.label];
    const flatNode: FlatTreeNode = {
      id: node.id,
      label: node.label,
      path: currentPath,
      pathLabel: currentPath.join(' / '),
      node,
    };
    const childFlats = node.children ? flattenTree(node.children, currentPath) : [];
    return [flatNode, ...childFlats];
  });

// 빠른 접근을 위해 id -> TreeNode 매핑을 생성
const createNodeIndex = (nodes: TreeNode[], target = new Map<Key, TreeNode>()) => {
  nodes.forEach((node) => {
    target.set(node.id, node);
    if (node.children?.length) {
      createNodeIndex(node.children, target);
    }
  });
  return target;
};

// 선택 영역에 출력할 수 있도록 간결한 브랜치 구조로 변환
const convertBranch = (node: TreeNode): BranchNode => ({
  id: node.id,
  label: node.label,
  children: (node.children ?? []).map(convertBranch),
});

// 특정 노드 기준으로 모든 하위 노드 key 수집
const collectDescendantKeys = (node?: TreeNode | null): Key[] => {
  if (!node?.children?.length) {
    return [];
  }
  return node.children.reduce<Key[]>((keys, child) => {
    keys.push(child.id, ...collectDescendantKeys(child));
    return keys;
  }, []);
};

// 중복 없이 확장 키를 합치기 위한 헬퍼
const mergeKeys = (current: Key[], next: Key[]) => {
  const merged = new Set<Key>([...current, ...next]);
  return Array.from(merged);
};

// rc-tree에 필요한 상태와 검색/선택 로직을 한 곳에서 관리하는 훅
export const useTreeController = (
  nodes: TreeNode[],
  onNodeSelect?: (selection: TreeNodeSelection) => void,
): UseTreeControllerResult => {
  // 입력 노드에서 파생되는 정규화 데이터들
  const treeData = useMemo(() => buildTreeData(nodes), [nodes]);
  const flatNodes = useMemo(() => flattenTree(nodes), [nodes]);
  const flatNodeById = useMemo(
    () => new Map<Key, FlatTreeNode>(flatNodes.map((flat) => [flat.id, flat])),
    [flatNodes],
  );
  const nodeIndex = useMemo(() => createNodeIndex(nodes), [nodes]);
  const defaultExpanded = useMemo(() => nodes.map((node) => node.id), [nodes]);

  // rc-tree 제어에 필요한 상태 값
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(defaultExpanded);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [searchValue, setSearchValue] = useState('');

  // 데이터 세트가 바뀌면 펼침/선택 상태를 초기화
  useEffect(() => {
    setExpandedKeys(defaultExpanded);
    setSelectedKeys([]);
  }, [defaultExpanded]);

  // 검색어에 매칭되는 경로들을 즉시 계산해 리스트로 노출
  const filteredResults = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) {
      return [];
    }
    return flatNodes
      .filter((flat) => flat.pathLabel.toLowerCase().includes(keyword))
      .map<TreeFilterResult>((flat) => ({id: flat.id, pathLabel: flat.pathLabel}));
  }, [flatNodes, searchValue]);

  // 선택된 노드와 모든 후손을 단순 구조로 변환해 사이드 영역에서 재귀 렌더링
  const selectedBranch = useMemo(() => {
    const selectedKey = selectedKeys[0];
    if (!selectedKey) {
      return null;
    }
    const node = nodeIndex.get(selectedKey);
    return node ? convertBranch(node) : null;
  }, [nodeIndex, selectedKeys]);

  const selectedPathLabel = useMemo(() => {
    const selectedKey = selectedKeys[0];
    if (!selectedKey) {
      return '';
    }
    const flat = flatNodeById.get(selectedKey);
    return flat?.pathLabel ?? '';
  }, [flatNodeById, selectedKeys]);

  // 특정 노드를 선택했을 때 모든 하위 노드를 펼치도록 확장 키를 누적
  const expandBranch = useCallback(
    (nodeId: Key) => {
      const node = nodeIndex.get(nodeId);
      if (!node) {
        return;
      }
      const branchKeys = [nodeId, ...collectDescendantKeys(node)];
      setExpandedKeys((prev) => mergeKeys(prev, branchKeys));
    },
    [nodeIndex],
  );

  // 외부로 선택 정보를 전달할 때는 평탄화된 노드를 기반으로 경로를 추출
  const emitSelection = useCallback(
    (nodeId: Key) => {
      if (!onNodeSelect) {
        return;
      }
      const flat = flatNodeById.get(nodeId);
      if (!flat) {
        return;
      }
      onNodeSelect({id: nodeId, path: flat.path, node: flat.node});
    },
    [flatNodeById, onNodeSelect],
  );

  const onExpand: NonNullable<TreeProps['onExpand']> = useCallback(
    (keys) => {
      // rc-tree가 내려준 확장 상태를 그대로 반영
      setExpandedKeys(keys as Key[]);
    },
    [],
  );

  const onSelect: NonNullable<TreeProps['onSelect']> = useCallback(
    (keys, info) => {
      const selectedKey = info.node.key as Key | undefined;
      setSelectedKeys(keys as Key[]);
      if (!info.selected || selectedKey === undefined) {
        return;
      }
      // 선택하면 그 브랜치를 모두 펼치고 선택 이벤트 발행
      expandBranch(selectedKey);
      emitSelection(selectedKey);
    },
    [emitSelection, expandBranch],
  );

  const onFilterSelect = useCallback(
    (id: Key) => {
      setSelectedKeys([id]);
      // 검색 결과 클릭 시에도 동일하게 확장+선택 처리
      expandBranch(id);
      emitSelection(id);
    },
    [emitSelection, expandBranch],
  );

  const onSearchChange = useCallback((nextValue: string) => {
    setSearchValue(nextValue);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchValue('');
  }, []);

  return {
    treeData,
    expandedKeys,
    selectedKeys,
    searchValue,
    filteredResults,
    selectedBranch,
    selectedPathLabel,
    onExpand,
    onSelect,
    onFilterSelect,
    onSearchChange,
    clearSearch,
  };
};
