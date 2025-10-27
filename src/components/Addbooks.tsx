
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";



const Addbooks = () => {
    return (
        <div className="max-w-7xl mx-auto min-h-screen">
             <div className="flex flex-col min-h-screen">
  
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Add New Book</h1>
          <form  className="space-y-6 bg-card p-6 rounded-lg border border-border">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title"  required />
            </div>
            <div>
              <Label htmlFor="author">Author *</Label>
              <Input id="author" name="author"   required />
            </div>
            <div>
              <Label htmlFor="genre">Genre *</Label>
              <Input id="genre" name="genre"   required />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN *</Label>
              <Input id="isbn" name="isbn"  required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="copies">Copies *</Label>
              <Input
                id="copies"
                name="copies"
                type="number"
                min="1"
               
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit">Create Book</Button>
              <Button type="button" variant="outline" >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    
    </div>
        </div>
    );
};

export default Addbooks;