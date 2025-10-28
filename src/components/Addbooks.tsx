"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useCreateBookMutation } from "@/redux/Api/baseApi";
import { toast } from "@/hooks/use-toast";


const Addbooks = () => {
  const [createBook, { data, isError, isLoading, isSuccess, error }] =
    useCreateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    formData.copies = parseInt(formData.copies);
    formData.available = formData.available === "true";

    try {
     const response= await createBook(formData).unwrap(); // unwrap() to handle success/error properly
      console.log(response?.data)
     toast({
        title: "✅ Book Added Successfully!",
        description: `${response?.data?.title || "New Book"} has been created.`,
      });
reset()
    } catch (err) {
      console.error("Failed to create book:", err);
       toast({
    title: "❌ Failed to add book",
    description: err?.data?.message || "Something went wrong",
    variant: "destructive",
  });
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Add New Book</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-card p-6 rounded-lg border border-border"
            >
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Author */}
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  {...register("author", { required: "Author is required" })}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div>
                <Label htmlFor="genre">Genre *</Label>
                <Input
                  id="genre"
                  {...register("genre", { required: "Genre is required" })}
                />
                {errors.genre && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.genre.message}
                  </p>
                )}
              </div>

              {/* ISBN */}
              <div>
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  {...register("isbn", { required: "ISBN is required" })}
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isbn.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} rows={4} />
              </div>

              {/* Copies */}
              <div>
                <Label htmlFor="copies">Copies *</Label>
                <Input
                  id="copies"
                  type="number"
                  min="1"
                  {...register("copies", {
                    required: "Number of copies is required",
                    min: { value: 1, message: "At least 1 copy required" },
                  })}
                />
                {errors.copies && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.copies.message}
                  </p>
                )}
              </div>

              {/* Available */}
              <div>
                <Label htmlFor="available">Available *</Label>
                <select
                  id="available"
                  {...register("available", )}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">Select status</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                {errors.available && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.available.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button type="submit">Create Book</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                >
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
