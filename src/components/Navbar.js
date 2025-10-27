import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (_jsx("div", { children: _jsx("nav", { className: "border-b border-border bg-card", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-6 h-6 text-primary" }), _jsx("span", { className: "font-semibold text-lg", children: "Library" })] }), _jsxs("div", { className: "flex gap-6", children: [_jsx(Link, { to: "/books", className: "text-foreground hover:text-primary transition", children: "All Books" }), _jsx(Link, { to: "/create-book", className: "text-foreground hover:text-primary transition", children: "Add Book" }), _jsx(Link, { to: "/borrow-summary", className: "text-foreground hover:text-primary transition", children: "Borrow Summary" })] })] }) }) }) }));
};
export default Navbar;
