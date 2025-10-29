import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "@/redux/Api/baseApi";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const BookDetails = () => {
    const { id } = useParams();
    const { data: bookData, isLoading, isError } = useGetBookByIdQuery(id);
    if (isLoading)
        return _jsx("p", { children: "Loading book details..." });
    if (isError)
        return _jsx("p", { children: "Error loading book details." });
    if (!bookData || !bookData.data)
        return _jsx("p", { children: "Book not found." });
    const book = bookData.data;
    return (_jsx("div", { className: "flex flex-col min-h-screen", children: _jsx("main", { className: "flex-1", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold", children: book.title }), _jsx(Link, { to: "/books", children: _jsx(Button, { variant: "outline", children: "Back to Books" }) })] }), _jsxs("div", { className: "bg-card p-6 rounded-lg border border-border shadow-sm", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Author:" }), _jsx("p", { className: "text-lg font-medium", children: book.author })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Genre:" }), _jsx("p", { className: "text-lg font-medium", children: book.genre })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "ISBN:" }), _jsx("p", { className: "text-lg font-medium", children: book.isbn })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Copies:" }), _jsx("p", { className: "text-lg font-medium", children: book.copies })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Availability:" }), _jsx("p", { className: `px-2 py-1 rounded text-sm font-medium inline-block ${book.available
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"}`, children: book.available ? "Available" : "Unavailable" })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("p", { className: "text-muted-foreground", children: "Description:" }), _jsx("p", { className: "text-base", children: book.description })] })] })] }) }) }));
};
export default BookDetails;
