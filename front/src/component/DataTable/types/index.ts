import type {InputHTMLAttributes, ReactNode} from 'react';
import type {ColumnDef, PaginationState, Table} from '@tanstack/react-table';

type DataTableSlotContext<TData> = {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
};

/**
 * 각 영역을 원하는 UI로 갈아끼우기 위한 슬롯 정의.
 */
type DataTableSlots<TData> = {
  toolbar?: (context: DataTableSlotContext<TData>) => ReactNode;
  actions?: (context: DataTableSlotContext<TData>) => ReactNode;
  footer?: (context: DataTableSlotContext<TData>) => ReactNode;
  emptyState?: (context: DataTableSlotContext<TData>) => ReactNode;
};

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  searchPlaceholder?: string;
  enableSelection?: boolean;
  onSelectionChange?: (rows: TData[]) => void;
  actions?: ReactNode;
  getRowId?: (originalRow: TData, index: number) => string;
  className?: string;
  toolbarClassName?: string;
  tableClassName?: string;
  footerClassName?: string;
  actionsClassName?: string;
  searchInputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;
  slots?: DataTableSlots<TData>;
  globalFilter?: string;
  defaultGlobalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  pagination?: PaginationState;
  defaultPagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
};

export type {DataTableProps, DataTableSlots, DataTableSlotContext};
