import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { BookMarked, Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useCreateBorrowMutation, useDeleteBookMutation, useGetBooksQuery, useUpdateBookMutation, } from "@/redux/Api/baseApi";
import { Textarea } from "./ui/textarea";
const Books = () => {
    const [editingBook, setEditingBook] = useState(null);
    const [deletingBook, setDeletingBook] = useState(null);
    const [borrowingBook, setBorrowingBook] = useState(null);
    const { data: books, isLoading, isError } = useGetBooksQuery(undefined);
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
    const { register, handleSubmit, reset } = useForm();
    // 📘 Borrow State
    const [borrowQuantity, setBorrowQuantity] = useState(1);
    const [borrowDueDate, setBorrowDueDate] = useState("");
    const [borrowError, setBorrowError] = useState("");
    const [createBorrow] = useCreateBorrowMutation();
    useEffect(() => {
        if (editingBook)
            reset(editingBook);
    }, [editingBook, reset]);
    const handleEdit = (book) => setEditingBook(book);
    const handleDeleteConfirm = (book) => setDeletingBook(book);
    const handleBorrow = (book) => {
        setBorrowingBook(book);
        setBorrowQuantity(1);
        setBorrowDueDate("");
        setBorrowError("");
    };
    const handleCloseDialogs = () => {
        setEditingBook(null);
        setDeletingBook(null);
        setBorrowingBook(null);
    };
    const handleBorrowSave = async (e) => {
        e.preventDefault();
        setBorrowError("");
        if (!borrowingBook)
            return;
        if (borrowQuantity <= 0)
            return setBorrowError("Quantity must be greater than 0");
        if (borrowQuantity > borrowingBook.copies)
            return setBorrowError(`Only ${borrowingBook.copies} copies available`);
        if (!borrowDueDate)
            return setBorrowError("Please select a due date");
        try {
            const borrowPayload = {
                book: borrowingBook._id, // must be "book"
                quantity: borrowQuantity, // flat
                dueDate: borrowDueDate, // flat
            };
            console.log("📦 Sending to backend:", borrowPayload);
            await createBorrow(borrowPayload).unwrap();
            const updatedCopies = borrowingBook.copies - borrowQuantity;
            const available = updatedCopies > 0;
            await updateBook({
                id: borrowingBook._id,
                copies: updatedCopies,
                available,
            }).unwrap();
            toast({
                title: "📘 Book Borrowed Successfully!",
                description: `${borrowingBook.title} borrowed until ${borrowDueDate}`,
            });
            setBorrowingBook(null);
        }
        catch (err) {
            console.error("❌ Borrow failed:", err);
            toast({
                title: "❌ Failed to borrow book",
                description: err?.data?.message || "Something went wrong",
                variant: "destructive",
            });
        }
    };
    const onSubmit = async (formData) => {
        formData.copies = parseInt(formData.copies);
        try {
            if (!editingBook)
                return; // Should not happen
            await updateBook({
                id: editingBook._id,
                ...formData,
            }).unwrap();
            toast({
                title: " Book updated successfully!",
                description: `${formData.title} has been updated.`,
            });
            setEditingBook(null);
        }
        catch (err) {
            toast({
                title: "❌ Failed to update book",
                description: err?.data?.message || "Something went wrong",
                variant: "destructive",
            });
        }
    };
    const handleDelete = async (id) => {
        try {
            await deleteBook(id).unwrap();
            toast({
                title: "🗑️ Book deleted successfully!",
                description: "The book has been removed from the library.",
            });
            setDeletingBook(null);
        }
        catch (err) {
            toast({
                title: "❌ Failed to delete book",
                description: err?.data?.message || "Something went wrong",
                variant: "destructive",
            });
        }
    };
    if (isLoading)
        return _jsx("p", { children: "Loading books..." });
    if (isError)
        return _jsx("p", { children: "Error loading books." });
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx("main", { className: "flex-1", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold", children: "All Books" }), _jsx(Link, { to: "/create-book", children: _jsx(Button, { children: "Add New Book" }) })] }), _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Title" }), _jsx(TableHead, { children: "Author" }), _jsx(TableHead, { children: "Genre" }), _jsx(TableHead, { children: "ISBN" }), _jsx(TableHead, { children: "Copies" }), _jsx(TableHead, { children: "Availability" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { children: books?.data?.map((book) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: _jsx(Link, { to: `/books/${book._id}`, className: "hover:underline", children: book.title }) }), _jsx(TableCell, { children: book.author }), _jsx(TableCell, { children: book.genre }), _jsx(TableCell, { className: "text-sm text-muted-foreground", children: book.isbn }), _jsx(TableCell, { children: book.copies }), _jsx(TableCell, { children: _jsx("span", { className: `px-2 py-1 rounded text-sm font-medium ${book.available
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"}`, children: book.available ? "Available" : "Unavailable" }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: () => handleEdit(book), size: "sm", variant: "outline", className: "w-8 h-8 p-0", children: _jsx(Edit2, { className: "w-4 h-4" }) }), _jsx(Button, { onClick: () => handleDeleteConfirm(book), size: "sm", variant: "outline", className: "w-8 h-8 p-0", children: _jsx(Trash2, { className: "w-4 h-4" }) }), _jsx(Button, { onClick: () => handleBorrow(book), size: "sm", variant: "outline", disabled: !book.available, className: "w-8 h-8 p-0", children: _jsx(BookMarked, { className: "w-4 h-4" }) })] }) })] }, book._id))) })] })] }) }), _jsx(Dialog, { open: !!editingBook, onOpenChange: handleCloseDialogs, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Edit Book" }) }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", children: "Title" }), _jsx(Input, { ...register("title"), id: "title", required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "author", children: "Author" }), _jsx(Input, { ...register("author"), id: "author", required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "genre", children: "Genre" }), _jsx(Input, { ...register("genre"), id: "genre", required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "isbn", children: "ISBN" }), _jsx(Input, { ...register("isbn"), id: "isbn", required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", ...register("description"), rows: 4 })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "copies", children: "Copies" }), _jsx(Input, { ...register("copies"), id: "copies", type: "number", required: true })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { onClick: handleCloseDialogs, type: "button", variant: "outline", children: "Cancel" }), _jsx(Button, { type: "submit", disabled: isUpdating, children: isUpdating ? "Saving..." : "Save Changes" })] })] })] }) }), _jsx(Dialog, { open: !!deletingBook, onOpenChange: handleCloseDialogs, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Confirm Delete" }), _jsxs(DialogDescription, { children: ["Are you sure you want to delete", " ", _jsx("span", { className: "font-semibold", children: deletingBook?.title }), "? This action cannot be undone."] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { onClick: handleCloseDialogs, variant: "outline", children: "Cancel" }), _jsx(Button, { onClick: () => deletingBook && handleDelete(deletingBook._id), variant: "destructive", disabled: isDeleting, children: isDeleting ? "Deleting..." : "Delete" })] })] }) }), _jsx(Dialog, { open: !!borrowingBook, onOpenChange: handleCloseDialogs, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Borrow Book" }), _jsx(DialogDescription, { children: "Please enter the quantity and due date to borrow this book." })] }), borrowingBook && (_jsxs("form", { onSubmit: handleBorrowSave, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: borrowingBook.title }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Available copies: ", borrowingBook.copies] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "quantity", children: "Quantity" }), _jsx(Input, { id: "quantity", type: "number", min: "1", max: borrowingBook.copies, value: borrowQuantity, onChange: (e) => setBorrowQuantity(Number.parseInt(e.target.value) || 1), required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "dueDate", children: "Due Date" }), _jsx(Input, { id: "dueDate", type: "date", value: borrowDueDate, onChange: (e) => setBorrowDueDate(e.target.value), required: true })] }), borrowError && _jsx("p", { className: "text-sm text-red-600", children: borrowError }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: handleCloseDialogs, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Borrow" })] })] }))] }) })] }));
};
export default Books;
