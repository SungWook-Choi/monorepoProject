import {useEffect, useState} from 'react';
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  Table,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

type UseDataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  onSelectionChange?: (selectedRows: TData[]) => void;
  getRowId?: (originalRow: TData, index: number) => string;
  globalFilter?: string;
  defaultGlobalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  pagination?: PaginationState;
  defaultPagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
};

type UseDataTableReturn<TData> = {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
  rowSelection: RowSelectionState;
  setRowSelection: (updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => void;
};

const defaultGetRowId = <TData,>(_: TData, index: number) => index.toString();

/**
 * Encapsulates TanStack table logic so the UI component stays lean.
 */
const useDataTable = <TData,>({
  columns,
  data,
  onSelectionChange,
  getRowId = defaultGetRowId,
  globalFilter: globalFilterProp,
  defaultGlobalFilter = '',
  onGlobalFilterChange,
  pagination: paginationProp,
  defaultPagination = {pageIndex: 0, pageSize: 10},
  onPaginationChange,
}: UseDataTableProps<TData>): UseDataTableReturn<TData> => {
  const [internalGlobalFilter, setInternalGlobalFilter] = useState(defaultGlobalFilter);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [internalPagination, setInternalPagination] = useState<PaginationState>(defaultPagination);

  const resolvedGlobalFilter = globalFilterProp ?? internalGlobalFilter;
  const resolvedPagination = paginationProp ?? internalPagination;

  // 외부에서 상태를 제어할 수도 있고, 내부에서만 관리할 수도 있도록 브릿지 역할을 한다.
  const handleGlobalFilterChange: OnChangeFn<string> = (updater) => {
    const nextValue = typeof updater === 'function' ? updater(resolvedGlobalFilter) : updater;
    if (globalFilterProp === undefined) {
      setInternalGlobalFilter(nextValue);
    }
    onGlobalFilterChange?.(nextValue);
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const nextValue = typeof updater === 'function' ? updater(resolvedPagination) : updater;
    if (paginationProp === undefined) {
      setInternalPagination(nextValue);
    }
    onPaginationChange?.(nextValue);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: resolvedGlobalFilter,
      rowSelection,
      pagination: resolvedPagination,
    },
    globalFilterFn: 'includesString',
    getRowId,
    onGlobalFilterChange: handleGlobalFilterChange,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (!onSelectionChange) {
      return;
    }

    // 선택 상태가 바뀔 때마다 실제 행 데이터를 상위로 전달한다.
    const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);
    onSelectionChange(selectedRows);
  }, [onSelectionChange, table, rowSelection]);

  return {
    table,
    globalFilter: resolvedGlobalFilter,
    setGlobalFilter: (value: string) => handleGlobalFilterChange(value),
    pagination: resolvedPagination,
    setPagination: (pagination: PaginationState) => handlePaginationChange(pagination),
    rowSelection,
    setRowSelection,
  };
};

export {useDataTable};
