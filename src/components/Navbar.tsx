import { BookOpen } from 'lucide-react';

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
        <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">Library</span>
          </Link>
          <div className="flex gap-6">
            <Link to="/books" className="text-foreground hover:text-primary transition">
              All Books
            </Link>
            <Link to="/create-book" className="text-foreground hover:text-primary transition">
              Add Book
            </Link>
            <Link to="/borrow-summary" className="text-foreground hover:text-primary transition">
              Borrow Summary
            </Link>
          </div>
        </div>
      </div>
    </nav>
        </div>
    );
};

export default Navbar;