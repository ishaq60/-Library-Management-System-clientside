import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { BookMarked, Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
 
  useCreateBorrowMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/redux/Api/baseApi";
import { Textarea } from "./ui/textarea";

const Books = () => {
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [borrowingBook, setBorrowingBook] = useState(null); 

  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const { register, handleSubmit, reset } = useForm();

 
  const [borrowQuantity, setBorrowQuantity] = useState(1);
  const [borrowDueDate, setBorrowDueDate] = useState("");
  const [borrowError, setBorrowError] = useState("");
  const [ createBorrow]=useCreateBorrowMutation()

  useEffect(() => {
    if (editingBook) reset(editingBook);
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

  if (borrowQuantity <= 0)
    return setBorrowError("Quantity must be greater than 0");
  if (borrowQuantity > borrowingBook.copies)
    return setBorrowError(`Only ${borrowingBook.copies} copies available`);
  if (!borrowDueDate)
    return setBorrowError("Please select a due date");

  try {
    const borrowPayload = {
      book: borrowingBook._id,  // must be "book"
      quantity: borrowQuantity,  // flat
      dueDate: borrowDueDate,    // flat
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
  } catch (err) {
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
      await updateBook({
        id: editingBook._id,
        ...formData,
      }).unwrap();

      toast({
        title: "✅ Book updated successfully!",
        description: `${formData.title} has been updated.`,
      });

      setEditingBook(null);
    } catch (err) {
      toast({
        title: "❌ Failed to update book",
        description: err?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // ✅ Delete Logic
  const handleDelete = async (id) => {
    try {
      await deleteBook(id).unwrap();
      toast({
        title: "🗑️ Book deleted successfully!",
        description: "The book has been removed from the library.",
      });
      setDeletingBook(null);
    } catch (err) {
      toast({
        title: "❌ Failed to delete book",
        description: err?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">All Books</h1>
            <Link to="/create-book">
              <Button>Add New Book</Button>
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books?.data?.map((book) => (
             
             <Link to={`/books/${book._id}`}>
                <TableRow key={book._id}>
                  <TableCell className="font-medium">
                    <Link to={`/books/${book._id}`} className="hover:underline">
                      {book.title}
                    </Link>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {book.isbn}
                  </TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        book.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(book)}
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteConfirm(book)}
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleBorrow(book)}
                        size="sm"
                        variant="outline"
                        disabled={!book.available}
                        className="w-8 h-8 p-0"
                      >
                        <BookMarked className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
             </Link>
             
               
          
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* ✏️ Edit Dialog */}
      <Dialog open={!!editingBook} onOpenChange={handleCloseDialogs}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input {...register("title")} id="title" required />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input {...register("author")} id="author" required />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input {...register("genre")} id="genre" required />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input {...register("isbn")} id="isbn" required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} rows={4} />
            </div>
            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input {...register("copies")} id="copies" type="number" required />
            </div>
            <DialogFooter>
              <Button onClick={handleCloseDialogs} type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 🗑️ Delete Dialog */}
      <Dialog open={!!deletingBook} onOpenChange={handleCloseDialogs}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deletingBook?.title}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseDialogs} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(deletingBook._id)}
              variant="destructive"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 📘 Borrow Dialog (Same Page) */}
      <Dialog open={!!borrowingBook} onOpenChange={handleCloseDialogs}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
               <DialogDescription>
            Please enter the quantity and due date to borrow this book.
          </DialogDescription>
          </DialogHeader>
          {borrowingBook && (
            <form onSubmit={handleBorrowSave} className="space-y-4">
              <div>
                <p className="font-medium">{borrowingBook.title}</p>
                <p className="text-sm text-muted-foreground">
                  Available copies: {borrowingBook.copies}
                </p>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={borrowingBook.copies}
                  value={borrowQuantity}
                  onChange={(e) =>
                    setBorrowQuantity(Number.parseInt(e.target.value) || 1)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={borrowDueDate}
                  onChange={(e) => setBorrowDueDate(e.target.value)}
                  required
                />
              </div>
              {borrowError && <p className="text-sm text-red-600">{borrowError}</p>}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialogs}>
                  Cancel
                </Button>
                <Button type="submit">Borrow</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Books;
