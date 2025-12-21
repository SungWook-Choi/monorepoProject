import {useState} from 'react';
import {TreeList} from '../../component/TreeList';
import type {TreeNodeSelection} from '../../component/TreeList';
import {WORKSPACE_TREE_NODES} from '../../data/tree.nodes';

const TreeTasksPage = () => {
  const [selectedPath, setSelectedPath] = useState('');

  const handleNodeSelect = (selection: TreeNodeSelection) => {
    setSelectedPath(selection.path.join(' / '));
  };

  return (
    <section className="page-section">
      <div className="page-card">
        <div className="page-card__header">
          <div>
            <p className="page-card__eyebrow">조직 구조</p>
            <h2>트리 작업</h2>
          </div>
          <span className="status-chip">실시간</span>
        </div>
        <p>검색, 선택 이벤트, 재귀적으로 하위 노드를 노출하는 커스텀 트리 컴포넌트입니다.</p>
        <TreeList
          nodes={WORKSPACE_TREE_NODES}
          title="워크스페이스 구조"
          height={420}
          onNodeSelect={handleNodeSelect}
        />
      </div>
      <div className="page-card">
        <div className="page-card__header">
          <div>
            <p className="page-card__eyebrow">최근 선택</p>
            <h2>선택된 경로</h2>
          </div>
        </div>
        <p>{selectedPath || '아직 선택된 노드가 없습니다.'}</p>
      </div>
    </section>
  );
};

export default TreeTasksPage;
