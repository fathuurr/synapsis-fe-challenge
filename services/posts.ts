import { IPosts } from "@/types/posts";
import axios from "axios";

const version = "v2";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllPosts() {
  const response = await axios.get(`${URL}/${version}/posts`);

  return response.data;
}

export async function paginationPosts(page: string, perPage: string) {
  const response = await axios.get(
    `${URL}/${version}/posts?page=${page}&per_page=${perPage}`,
  );

  return response.data;
}

export async function getPostsById(id: string) {
  const response = await axios.get(`${URL}/${version}/posts/${id}`);

  return response.data;
}

export async function getCommentByPostId(postId: string) {
  const response = await axios.get(
    `${URL}/${version}/posts/${postId}/comments`,
  );

  return response.data;
}
