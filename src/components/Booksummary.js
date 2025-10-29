import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useGetBorrowQuery } from "@/redux/Api/baseApi";
const Booksummary = () => {
    const { data, isLoading, isError } = useGetBorrowQuery(undefined);
    const borrow = data?.data || [];
    console.log(borrow);
    if (isLoading)
        return _jsx("p", { children: "Loading..." });
    if (isError)
        return _jsx("p", { children: "Error loading borrow data." });
    return (_jsx("div", { children: _jsx("main", { className: "flex-1 min-h-screen", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "Borrow Summary" }), _jsx("div", { className: "border border-border rounded-lg overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Book Title" }), _jsx(TableHead, { children: "ISBN" }), _jsx(TableHead, { children: "Total Quantity Borrowed" })] }) }), _jsx(TableBody, { children: borrow.map((bor, idx) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: bor?.book?.title }), _jsx(TableCell, { className: "text-sm text-muted-foreground", children: bor?.book?.isbn }), _jsx(TableCell, { children: bor.totalQuantity })] }, idx))) })] }) })] }) }) }));
};
export default Booksummary;
