import { NavLink, Outlet } from 'react-router';
import './Layout.css';

const Layout = () => {
    return (
        <>
            <nav className="nav">
                <NavLink to="/">Home</NavLink> |<NavLink to="/profile">Profile</NavLink> |
                <NavLink to="/admin">Admin</NavLink>
            </nav>
            <Outlet />
        </>
    );
};

export default Layout;
