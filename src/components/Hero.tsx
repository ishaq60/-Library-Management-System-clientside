
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Library Management</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Manage your book collection, track borrowing, and organize your library with ease.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/books">
            <Button>View All Books</Button>
          </Link>
          <Link to="/create-book">
            <Button variant="outline">Add New Book</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
