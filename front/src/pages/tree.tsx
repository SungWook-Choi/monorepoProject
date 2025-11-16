import {useState} from 'react';
import {TreeList} from '../component/TreeList';
import type {TreeNodeSelection} from '../component/TreeList';
import {WORKSPACE_TREE_NODES} from '../data/tree.nodes';

const TreeTasksPage = () => {
  const [selectedPath, setSelectedPath] = useState('');

  const handleNodeSelect = (selection: TreeNodeSelection) => {
    setSelectedPath(selection.path.join(' / '));
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <h1>트리 작업</h1>
      <p>검색, 선택 이벤트, 재귀적으로 하위 노드를 노출하는 커스텀 트리 컴포넌트입니다.</p>
      <TreeList
        nodes={WORKSPACE_TREE_NODES}
        title="워크스페이스 구조"
        height={420}
        onNodeSelect={handleNodeSelect}
      />
      <section>
        <h2>최근 선택한 경로</h2>
        <p>{selectedPath || '아직 선택된 노드가 없습니다.'}</p>
      </section>
    </div>
  );
};

export default TreeTasksPage;
