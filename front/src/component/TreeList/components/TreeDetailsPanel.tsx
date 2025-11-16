import type {BranchNode} from '../types';

type TreeDetailsPanelProps = {
  selectedBranch: BranchNode | null;
  selectedPathLabel: string;
};

const renderBranch = (node: BranchNode) => (
  <li key={node.id}>
    <span>{node.label}</span>
    {node.children.length > 0 && <ul>{node.children.map(renderBranch)}</ul>}
  </li>
);

// 트리 우측 상세 패널: 선택 경로와 하위 브랜치 표시
export const TreeDetailsPanel = ({selectedBranch, selectedPathLabel}: TreeDetailsPanelProps) => (
  <aside className="tree-list__details">
    <h3>선택한 트리 정보</h3>
    {selectedBranch ? (
      <>
        <p className="tree-list__selected-path">{selectedPathLabel}</p>
        <div className="tree-list__selected-branch">
          <ul>{renderBranch(selectedBranch)}</ul>
        </div>
      </>
    ) : (
      <p className="tree-list__placeholder">트리에서 팀이나 프로젝트를 선택하세요.</p>
    )}
  </aside>
);
