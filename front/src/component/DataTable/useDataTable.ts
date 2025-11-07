import {useEffect, useState} from 'react';
import type {ColumnDef, RowSelectionState, Table} from '@tanstack/react-table';
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
};

type UseDataTableReturn<TData> = {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  rowSelection: RowSelectionState;
  setRowSelection: (updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => void;
};

const defaultGetRowId = <TData,>(_: TData, index: number) => index.toString();

/**
 * Encapsulates TanStack table logic so the UI component stays lean.
 */
function useDataTable<TData>({
  columns,
  data,
  onSelectionChange,
  getRowId = defaultGetRowId,
}: UseDataTableProps<TData>): UseDataTableReturn<TData> {
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      rowSelection,
    },
    globalFilterFn: 'includesString',
    getRowId,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (!onSelectionChange) {
      return;
    }

    const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);
    onSelectionChange(selectedRows);
  }, [onSelectionChange, table, rowSelection]);

  return {
    table,
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
  };
}

export {useDataTable};
