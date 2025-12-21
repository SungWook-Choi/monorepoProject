import type {JSX} from 'react';
import DashboardPage from '../pages/home/home';
import LedgerPage from '../pages/ledger/ledger';
import SystemManagePage from '../pages/system/system';

type routeProps = {
    id: string,
    to: string,
    label: string,
    element: JSX.Element
}

export const appRoutes:routeProps[] = [
    { id: 'dashboard', to: '/dashboard', label: '대시보드', element: <DashboardPage /> },
    { id: 'ledger', to: '/ledger', label: '가계부', element: <LedgerPage />},
    { id: 'system', to: '/system', label: '시스템 관리', element: <SystemManagePage />},
];
