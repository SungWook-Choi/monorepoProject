import type {ChangeEvent} from 'react';
import {useMemo} from 'react';
import type {ColumnDef} from '@tanstack/react-table';
import {flexRender} from '@tanstack/react-table';
import {useDataTable} from '../hooks/useDataTable';
import {IndeterminateCheckbox} from './IndeterminateCheckbox';
import type {DataTableProps, DataTableSlotContext} from '../types';
import '../styles/DataTable.css';

const DEFAULT_SEARCH_PLACEHOLDER = '검색어를 입력하세요';

// 기본 클래스에 사용자 정의 클래스를 얹기 위한 헬퍼.
const mergeClassNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

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
  className,
  toolbarClassName,
  tableClassName,
  footerClassName,
  actionsClassName,
  searchInputProps,
  slots,
  globalFilter,
  defaultGlobalFilter,
  onGlobalFilterChange,
  pagination,
  defaultPagination,
  onPaginationChange,
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

  const {
    table,
    globalFilter: resolvedGlobalFilter,
    setGlobalFilter,
  } = useDataTable({
    columns: tableColumns,
    data,
    onSelectionChange,
    getRowId,
    globalFilter,
    defaultGlobalFilter,
    onGlobalFilterChange,
    pagination,
    defaultPagination,
    onPaginationChange,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
  };

  const slotContext: DataTableSlotContext<TData> = {
    table,
    globalFilter: resolvedGlobalFilter,
    setGlobalFilter,
  };

  const resolvedActions =
    slots?.actions?.(slotContext) ?? actions;

  const toolbarContent =
    // 별도 슬롯이 없으면 검색 인풋 + 액션 영역을 기본으로 그린다.
    slots?.toolbar?.(slotContext) ?? (
      <>
        <input
          className="data-table__search"
          type="search"
          value={resolvedGlobalFilter ?? ''}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          {...searchInputProps}
        />
        {resolvedActions ? (
          <div className={mergeClassNames('data-table__actions', actionsClassName)}>
            {resolvedActions}
          </div>
        ) : null}
      </>
    );

  const footerContent =
    // 별도 슬롯이 없으면 페이지네이션 + 총합 상태를 기본으로 보여준다.
    slots?.footer?.(slotContext) ?? (
      <>
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
      </>
    );

  const emptyState =
    // 데이터가 없을 때의 기본 안내 문구.
    slots?.emptyState?.(slotContext) ?? (
      <td colSpan={table.getAllColumns().length} className="data-table__empty">
        표시할 데이터가 없습니다.
      </td>
    );

  return (
    <div className={mergeClassNames('data-table', className)}>
      <div className={mergeClassNames('data-table__toolbar', toolbarClassName)}>
        {toolbarContent}
      </div>
      <div className="data-table__container">
        <table className={mergeClassNames('data-table__table', tableClassName)}>
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
              {emptyState}
            </tr>
          ) : null}
          </tbody>
        </table>
      </div>
      <div className={mergeClassNames('data-table__footer', footerClassName)}>
        {footerContent}
      </div>
    </div>
  );
};

export {DataTable};
