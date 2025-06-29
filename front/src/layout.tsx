import {Link, Outlet} from 'react-router-dom';
import {routes} from './routes/route.tsx';

const Layout = () => {
    return (
        <div className="mainContainer">
                <nav>
                    {routes.map((item) => (
                        <Link to={item.to}>{item.label}</Link>
                    ))}
                </nav>
                <main>
                    <div className="headerContainer">

                    </div>
                    <div className="bodyContainer">
                        <Outlet />
                    </div>
                </main>
        </div>
    )
}

export default Layout;
