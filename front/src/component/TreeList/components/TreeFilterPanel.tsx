import type {Key} from 'react';
import type {TreeFilterResult} from '../types';
import {highlightText} from '../utils/highlightText';

type TreeFilterPanelProps = {
  searchValue: string;
  filteredResults: TreeFilterResult[];
  onSearchChange: (value: string) => void;
  onFilterSelect: (id: Key) => void;
  clearSearch: () => void;
};

// 트리 검색/필터 영역(입력, 결과 리스트, 초기화 버튼)
export const TreeFilterPanel = ({
  searchValue,
  filteredResults,
  onSearchChange,
  onFilterSelect,
  clearSearch,
}: TreeFilterPanelProps) => (
  <div className="tree-list__filter">
    <label htmlFor="tree-list-filter">하이라키 검색</label>
    <div className="tree-list__filter-input">
      <input
        id="tree-list-filter"
        type="search"
        placeholder="팀 또는 프로젝트 이름으로 검색하세요"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      {searchValue && (
        <button type="button" onClick={clearSearch}>
          초기화
        </button>
      )}
    </div>
    {searchValue && <p className="tree-list__filter-count">총 {filteredResults.length}건</p>}
    {filteredResults.length > 0 && (
      <ul className="tree-list__filter-results">
        {filteredResults.map((result) => (
          <li key={result.id as Key}>
            <button type="button" onClick={() => onFilterSelect(result.id)}>
              {highlightText(result.pathLabel, searchValue)}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
