import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export function Hero() {
    return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-foreground mb-4", children: "Welcome to Library Management" }), _jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto", children: "Manage your book collection, track borrowing, and organize your library with ease." }), _jsxs("div", { className: "flex gap-4 justify-center", children: [_jsx(Link, { to: "/books", children: _jsx(Button, { children: "View All Books" }) }), _jsx(Link, { to: "/create-book", children: _jsx(Button, { variant: "outline", children: "Add New Book" }) })] })] }) }));
}
