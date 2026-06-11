import { type PostsResponse } from "@/types/post";

export async function fetchPosts(): Promise<PostsResponse> {
  const response = await fetch("https://dummyjson.com/c/290b-f6b1-4896-8c91");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  console.log("data", data);

  return data;
}
