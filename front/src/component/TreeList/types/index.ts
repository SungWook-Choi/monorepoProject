import type {Key} from 'react';

// 트리 원본 데이터 형태(외부 API나 상위 컴포넌트가 내려주는 구조)
export type TreeNode = {
  id: Key;
  label: string;
  description?: string;
  children?: TreeNode[];
};

// 노드 선택 시 상위에 전달되는 정보(경로/원본 노드 포함)
export type TreeNodeSelection = {
  id: Key;
  path: string[];
  node: TreeNode;
};

// 검색 및 라벨 표시를 위해 미리 평탄화한 노드
export type FlatTreeNode = {
  id: Key;
  label: string;
  path: string[];
  pathLabel: string;
  node: TreeNode;
};

// 선택된 노드를 재귀적으로 렌더링하기 위한 단순화 버전
export type BranchNode = {
  id: Key;
  label: string;
  children: BranchNode[];
};

// 필터 결과를 표현할 때 사용하는 정보
export type TreeFilterResult = {
  id: Key;
  pathLabel: string;
};

// TreeList 컴포넌트 외부 API
export interface TreeListProps {
  nodes: TreeNode[];
  title?: string;
  height?: number;
  onNodeSelect?: (selection: TreeNodeSelection) => void;
}
