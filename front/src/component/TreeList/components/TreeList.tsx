import {memo} from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import '../styles/TreeList.css';
import {useTreeController} from '../hooks/useTreeController';
import type {TreeListProps} from '../types';
import {TreeFilterPanel} from './TreeFilterPanel';
import {TreeDetailsPanel} from './TreeDetailsPanel';
import {highlightText} from '../utils/highlightText';

// TreeList 본체: 필터 영역, rc-tree, 선택 요약 패널을 구성
const TreeListComponent = ({nodes, title = '조직 트리', height = 360, onNodeSelect}: TreeListProps) => {
  const {
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
  } = useTreeController(nodes, onNodeSelect);

  return (
    <section className="tree-list">
      <header className="tree-list__header">
        <div>
          <p className="tree-list__eyebrow">Tree Component powered by rc-tree</p>
          <h2>{title}</h2>
        </div>
        <TreeFilterPanel
          searchValue={searchValue}
          filteredResults={filteredResults}
          onSearchChange={onSearchChange}
          onFilterSelect={onFilterSelect}
          clearSearch={clearSearch}
        />
      </header>
      <div className="tree-list__body">
        <div className="tree-list__tree">
          {/* rc-tree@5.13.1은 showLine만 boolean을 받으므로 CSS에서 leaf 아이콘 제거/블록 효과 처리 */}
          <Tree
            height={height}
            itemHeight={28}
            showLine
            treeData={treeData}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onExpand={onExpand}
            onSelect={onSelect}
            titleRender={(node) => highlightText(String(node.title), searchValue)}
          />
        </div>
        <TreeDetailsPanel selectedBranch={selectedBranch} selectedPathLabel={selectedPathLabel} />
      </div>
    </section>
  );
};

export const TreeList = memo(TreeListComponent);
