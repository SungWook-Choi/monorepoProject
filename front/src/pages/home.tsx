import {useMemo, useState} from 'react';
import type {ColumnDef} from '@tanstack/react-table';
import {DataTable} from '../component/DataTable';

type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Former';
  joinedAt: string;
};

const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: 'E-001',
    name: 'Jiyoon Park',
    email: 'jiyoon.park@example.com',
    department: 'Product',
    status: 'Active',
    joinedAt: '2023-04-12',
  },
  {
    id: 'E-002',
    name: 'Minseo Choi',
    email: 'minseo.choi@example.com',
    department: 'Engineering',
    status: 'Active',
    joinedAt: '2022-08-01',
  },
  {
    id: 'E-003',
    name: 'Daniel Kim',
    email: 'daniel.kim@example.com',
    department: 'Design',
    status: 'On Leave',
    joinedAt: '2021-11-19',
  },
  {
    id: 'E-004',
    name: 'Ara Lee',
    email: 'ara.lee@example.com',
    department: 'Engineering',
    status: 'Active',
    joinedAt: '2020-02-03',
  },
  {
    id: 'E-005',
    name: 'Junho Lim',
    email: 'junho.lim@example.com',
    department: 'Customer Success',
    status: 'Former',
    joinedAt: '2019-06-17',
  },
];

const HomePage = () => {
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  const columns = useMemo<ColumnDef<Employee, unknown>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({getValue}) => {
        const value = getValue<string>();
        return <a href={`mailto:${value}`}>{value}</a>;
      },
    },
    {
      accessorKey: 'department',
      header: 'Department',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      meta: {
        align: 'center',
      },
    },
    {
      accessorKey: 'joinedAt',
      header: 'Joined',
      cell: ({getValue}) => {
        const dateValue = getValue<string>();
        return new Date(dateValue).toLocaleDateString();
      },
    },
  ], []);

  const selectedCount = selectedRows.length;

  const actions = (
    <button type="button" disabled={selectedCount === 0}>
      Export {selectedCount ? `${selectedCount} rows` : 'selection'}
    </button>
  );

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <h1>Home Page</h1>
      <DataTable
        columns={columns}
        data={SAMPLE_EMPLOYEES}
        onSelectionChange={setSelectedRows}
        actions={actions}
        getRowId={(row) => row.id}
        searchPlaceholder="직원 정보를 검색하세요"
      />
    </div>
  );
};

export default HomePage;
