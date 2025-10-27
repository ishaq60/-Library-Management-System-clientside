import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookMarked, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
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
import { useGetBooksQuery } from "@/redux/Api/baseApi";

const Books = () => {
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);
  console.log({ books, isLoading, isError });

  const handleEdit = (book) => setEditingBook(book);
  const handleDelete = (book) => setDeletingBook(book);
  const handleConfirmDelete = () => {
    console.log("Deleting:", deletingBook);
    setDeletingBook(null);
  };
  const handleCloseDialogs = () => {
    setEditingBook(null);
    setDeletingBook(null);
  };

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
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading books...
                  </TableCell>
                </TableRow>
              )}

              {isError && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-red-500 py-4">
                    Failed to load books.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                !isError &&
                books?.data?.length > 0 &&
                books.data.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
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
                          onClick={() => handleDelete(book)}
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
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
                ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <Dialog open={!!editingBook} onOpenChange={handleCloseDialogs}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" required />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" name="genre" required />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" name="isbn" required />
            </div>
            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input id="copies" name="copies" type="number" required />
            </div>
            <DialogFooter>
              <Button onClick={handleCloseDialogs} type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
            <Button onClick={handleConfirmDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Books;
