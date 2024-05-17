import axios from "axios";

const version = "v2";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllPosts() {
  const response = await axios.get(`${URL}/${version}/posts`);

  return response.data;
}
