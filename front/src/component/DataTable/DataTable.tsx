import type {ChangeEvent, ReactNode} from 'react';
import {useMemo} from 'react';
import type {ColumnDef} from '@tanstack/react-table';
import {flexRender} from '@tanstack/react-table';
import {useDataTable} from './useDataTable';
import {IndeterminateCheckbox} from './IndeterminateCheckbox';
import './DataTable.css';

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  searchPlaceholder?: string;
  enableSelection?: boolean;
  onSelectionChange?: (rows: TData[]) => void;
  actions?: ReactNode;
  getRowId?: (originalRow: TData, index: number) => string;
};

const DEFAULT_SEARCH_PLACEHOLDER = '검색어를 입력하세요';

/**
 * 검색·페이징·선택·액션 영역까지 한 번에 제공하는 범용 테이블 컴포넌트.
 */
const DataTable = <TData,>({
  columns,
  data,
  enableSelection = true,
  searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
  onSelectionChange,
  actions,
  getRowId,
}: DataTableProps<TData>) => {
  // 선택 기능이 켜져 있을 때만 체크박스 컬럼을 주입한다.
  const selectionColumn = useMemo<ColumnDef<TData, unknown> | null>(() => {
    if (!enableSelection) {
      return null;
    }

    return {
      id: '__select__',
      header: ({table}) => (
        <IndeterminateCheckbox
          aria-label="Select all rows"
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({row}) => (
        <IndeterminateCheckbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 48,
      meta: {
        align: 'center',
      },
    };
  }, [enableSelection]);

  // 기존 컬럼 순서는 유지하면서 체크박스 컬럼만 맨 앞에 붙인다.
  const tableColumns = useMemo(() => {
    if (!selectionColumn) {
      return columns;
    }
    return [selectionColumn, ...columns];
  }, [selectionColumn, columns]);

  const {table, globalFilter, setGlobalFilter} = useDataTable({
    columns: tableColumns,
    data,
    onSelectionChange,
    getRowId,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
  };

  return (
    <div className="data-table">
      <div className="data-table__toolbar">
        <input
          className="data-table__search"
          type="search"
          value={globalFilter ?? ''}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
        />
        {actions ? <div className="data-table__actions">{actions}</div> : null}
      </div>
      <div className="data-table__container">
        <table className="data-table__table">
          <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{textAlign: header.column.columnDef.meta?.align ?? 'left'}}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  data-column={cell.column.id}
                  style={{textAlign: cell.column.columnDef.meta?.align ?? 'left'}}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={table.getAllColumns().length} className="data-table__empty">
                표시할 데이터가 없습니다.
              </td>
            </tr>
          ) : null}
          </tbody>
        </table>
      </div>
      <div className="data-table__footer">
        <div className="data-table__pagination">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </button>
          <span>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음
          </button>
        </div>
        <div className="data-table__status">
          총 {table.getFilteredRowModel().rows.length}건
        </div>
      </div>
    </div>
  );
};

export {DataTable};
