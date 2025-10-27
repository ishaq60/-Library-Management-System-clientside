import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../index.css';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
const Root = () => {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx(Outlet, {}), _jsx(Footer, {})] }));
};
export default Root;
