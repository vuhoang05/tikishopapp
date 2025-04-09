
import { ICategory } from "../types/category";
import instance from "./apiService";

export const getCategory = async (): Promise<ICategory[]> => {
  return instance.get("categories")
}

export const getCategoryById = async (id: number): Promise<ICategory> => {
  return instance.get("categories/" + id)
}

export const createCategory = async (data: ICategory) => {
  return instance.post("categories", data)
}

// Update
export const updateCategory = async (id: number, data: ICategory) => {
  return instance.put("categories/" + id, data)
}

// Delete
export const deleteCategory = async (id: number) => {
  return instance.delete("categories" + `/${id}`)
}
