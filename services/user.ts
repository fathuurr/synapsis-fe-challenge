import { IUser } from "@/types/user";
import axios from "axios";

const version = "v2";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function searchUsers(query: string) {
  const response = await axios.get(`${URL}/${version}/users?name=${query}`);

  return response.data;
}

export async function paginationUser(page: string, perPage: string) {
  const response = await axios.get(
    `${URL}/${version}/users?page=${page}&per_page=${perPage}`,
  );

  return response.data;
}

export async function addUser(data: any) {
  const response = await axios.post(`${URL}/${version}/users`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 6b53ac603389928548b909c723995f6698917452ef374cadcac8742a8e379c31",
    },
  });

  return response.data;
}

export async function updateUserById(data: IUser, id: string) {
  const response = await axios.put(`${URL}/${version}/users/${id}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 6b53ac603389928548b909c723995f6698917452ef374cadcac8742a8e379c31",
    },
  });

  return response.data;
}

export async function deleteUserById(id: string) {
  const response = await axios.delete(`${URL}/${version}/users/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 6b53ac603389928548b909c723995f6698917452ef374cadcac8742a8e379c31",
    },
  });

  return response.data;
}
