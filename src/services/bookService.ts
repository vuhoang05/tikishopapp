
import instance from "./apiService";
import { Book } from "../types/book";

export const getBook = async (): Promise<Book[]> => {
  return instance.get("books")
}

export const getBookById = async (id: number): Promise<Book> => {
  return instance.get("books/" + id)
}

export const createBook = async (data: Book) => {
  return instance.post("books", data)
}

// Update

export const updateBook = async (id: number, data: Book) => {
  return instance.put("book/" + id, data)
}

// Delete
export const deleteBook = async (id: number) => {
  return instance.delete("books" + `/${id}`)
}
