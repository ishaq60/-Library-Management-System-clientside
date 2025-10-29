"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useCreateBookMutation } from "@/redux/Api/baseApi";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
const Addbooks = () => {
    const [createBook] = useCreateBookMutation();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: { available: "true", copies: 1 },
    });
    const onSubmit = async (formData) => {
        const bookData = {
            ...formData,
            copies: parseInt(formData.copies),
            available: formData.available === "true",
        };
        try {
            const response = await createBook(bookData).unwrap();
            console.log(response?.data);
            toast({
                title: "✅ Book Added Successfully!",
                description: `${response?.data?.title || "New Book"} has been created.`,
            });
            reset();
            navigate("/books");
        }
        catch (err) {
            console.error("Failed to create book:", err);
            toast({
                title: "❌ Failed to add book",
                description: err?.data?.message || "Something went wrong",
                variant: "destructive",
            });
        }
    };
    return (_jsx("div", { className: "max-w-7xl mx-auto min-h-screen", children: _jsx("div", { className: "flex flex-col min-h-screen", children: _jsx("main", { className: "flex-1", children: _jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "Add New Book" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6 bg-card p-6 rounded-lg border border-border", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", children: "Title *" }), _jsx(Input, { id: "title", ...register("title", { required: "Title is required" }) }), errors.title && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.title.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "author", children: "Author *" }), _jsx(Input, { id: "author", ...register("author", { required: "Author is required" }) }), errors.author && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.author.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "genre", children: "Genre *" }), _jsx(Input, { id: "genre", ...register("genre", { required: "Genre is required" }) }), errors.genre && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.genre.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "isbn", children: "ISBN *" }), _jsx(Input, { id: "isbn", ...register("isbn", { required: "ISBN is required" }) }), errors.isbn && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.isbn.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", ...register("description"), rows: 4 }), errors.description && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.description.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "copies", children: "Copies *" }), _jsx(Input, { id: "copies", type: "number", min: "1", ...register("copies", {
                                                required: "Number of copies is required",
                                                min: { value: 1, message: "At least 1 copy required" },
                                            }) }), errors.copies && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.copies.message }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "available", children: "Available *" }), _jsxs("select", { id: "available", ...register("available"), className: "border border-gray-300 rounded-md p-2 w-full", children: [_jsx("option", { value: "true", children: "True" }), _jsx("option", { value: "false", children: "False" })] }), errors.available && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.available.message }))] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { type: "submit", children: "Create Book" }), _jsx(Button, { type: "button", variant: "outline", onClick: () => reset(), children: "Cancel" })] })] })] }) }) }) }));
};
export default Addbooks;
