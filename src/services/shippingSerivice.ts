
import { Iservice } from "../types/service";
import instance from "./apiService";

export const getService = async (): Promise<Iservice[]> => {
  return instance.get("service")
}

export const getServiceById = async (id: number): Promise<Iservice> => {
  return instance.get("service/" + id)
}

export const createService = async (data: Iservice) => {
  return instance.post("service", data)
}

// Update
export const updateService = async (id: number, data: Iservice) => {
  return instance.put("service/" + id, data)
}

// Delete
export const deleteService = async (id: number) => {
  return instance.delete("service" + `/${id}`)
}
