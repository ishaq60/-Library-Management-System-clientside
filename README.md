# Minimal Library Management System 📚

A clean and functional library management system built with React, TypeScript, and Redux Toolkit Query. This application allows users to manage books, borrow items, and view borrowing summaries without authentication.

## Features

### 📖 Book Management
- **View Books**: Display all books in a responsive table with Title, Author, Genre, ISBN, Copies, and Availability
- **Add Books**: Create new books with title, author, genre, ISBN, description, and copy count
- **Edit Books**: Update existing book information with instant UI updates
- **Delete Books**: Remove books with confirmation dialog
- **Availability Logic**: Books marked as unavailable when copies reach 0

### 🔄 Borrowing System
- **Borrow Books**: Borrow books with quantity and due date validation
- **Quantity Validation**: Cannot borrow more copies than available
- **Borrow Summary**: View an aggregated list of all borrowed books with total quantities

### 🎨 User Interface
- **Minimalist Design**: Clean, simple UI using Tailwind CSS without gradients
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Easy Navigation**: Simple navbar with links to all main sections
- **Intuitive Forms**: Type-safe forms with clear validation


## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with navigation |
| `/books` | View all books with CRUD actions |
| `/create-book` | Form to add a new book |
| `/books/:id` | Detailed view of a single book |
| `/edit-book/:id` | Edit existing book details |
| `/borrow/:bookId` | Borrow a book with quantity and due date |
| `/borrow-summary` | View aggregated borrowed books |

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript |
| State Management | Redux Toolkit + RTK Query |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd library-management-system
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding a Book
1. Click "Add Book" in the navbar
2. Fill in book details (Title, Author, Genre, ISBN, Description, Copies)
3. Submit to add the book to the library

### Borrowing a Book
1. Go to "All Books" page
2. Click the "Borrow" button on any book
3. Enter quantity (cannot exceed available copies) and due date
4. Submit to complete the borrow

### Viewing Borrow Summary
1. Click "Borrow Summary" in the navbar
2. View all borrowed books with total quantities

### Editing a Book
1. Go to "All Books" page
2. Click the "Edit" button on any book
3. Update the book information
4. Submit to save changes

### Deleting a Book
1. Go to "All Books" page
2. Click the "Delete" button on any book
3. Confirm deletion in the dialog

## API Integration

This frontend is designed to work with a Node.js + Express backend using MongoDB. The backend should provide the following endpoints:

### Books Endpoints
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Borrow Endpoints
- `POST /api/borrows` - Create borrow record
- `GET /api/borrows/summary` - Get borrow summary

## Features Implemented

- ✅ Book CRUD operations
- ✅ Borrow functionality with validation
- ✅ Borrow summary page
- ✅ Responsive design
- ✅ Type-safe forms
- ✅ Minimalist UI design
- ✅ Navigation and routing
- ✅ Confirmation dialogs



## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the repository.
