import type {JSX} from 'react';
import HomePage from '../pages/home';
import AboutPage from '../pages/about';
import ContractPage from '../pages/contract';

type routeProps = {
    id: string,
    to: string,
    label: string,
    element: JSX.Element
}

export const routes:routeProps[] = [
    { id: 'home', to: '/', label: 'Home', element: <HomePage /> },
    { id: 'about', to: '/about', label: 'About', element: <AboutPage />},
    { id: 'contract', to: '/contact', label: 'Contact', element: <ContractPage />},
]
