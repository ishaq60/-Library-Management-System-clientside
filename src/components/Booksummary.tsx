import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetBorrowQuery } from "@/redux/Api/baseApi";


const Booksummary = () => {
  const { data, isLoading, isError } = useGetBorrowQuery(undefined);
  const borrow = data?.data || [];
console.log(borrow)
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading borrow data.</p>;

  return (
    <div>
      <main className="flex-1 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Borrow Summary</h1>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Total Quantity Borrowed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrow.map((bor, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{bor?.book?.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{bor?.book?.isbn}</TableCell>
                    <TableCell>{bor.totalQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Booksummary