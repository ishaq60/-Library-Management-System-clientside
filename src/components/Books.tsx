import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookMarked, Edit2, Trash2 } from "lucide-react";
const books=[
      {
        _id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        isbn: "978-0743273565",
        copies: 5,
        available: true,
      },
      {
        _id: "2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        isbn: "978-0061120084",
        copies: 3,
        available: true,
      },
]

const Books = () => {
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
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline"  className="w-8 h-8 p-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                    //   onClick={() => handleBorrow(book)}
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
      </main>

      <div>
       
      </div>
    </div>
  );
};

export default Books;
