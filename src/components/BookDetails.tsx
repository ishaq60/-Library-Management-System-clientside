import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../redux/Api/baseApi";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bookData, isLoading, isError } = useGetBookByIdQuery(id);

  if (isLoading) return <p>Loading book details...</p>;
  if (isError) return <p>Error loading book details.</p>;
  if (!bookData || !bookData.data) return <p>Book not found.</p>;

  const book = bookData.data;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <Link to="/books">
              <Button variant="outline">Back to Books</Button>
            </Link>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground">Author:</p>
                <p className="text-lg font-medium">{book.author}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Genre:</p>
                <p className="text-lg font-medium">{book.genre}</p>
              </div>
              <div>
                <p className="text-muted-foreground">ISBN:</p>
                <p className="text-lg font-medium">{book.isbn}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Copies:</p>
                <p className="text-lg font-medium">{book.copies}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Availability:</p>
                <p
                  className={`px-2 py-1 rounded text-sm font-medium inline-block ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-muted-foreground">Description:</p>
              <p className="text-base">{book.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
