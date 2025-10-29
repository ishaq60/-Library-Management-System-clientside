export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface BorrowedBookSummary {
  _id: string;
  book: Book; // Assuming book is populated
  quantity: number;
  dueDate: string;
  totalQuantity: number; // For the summary aggregation
}
