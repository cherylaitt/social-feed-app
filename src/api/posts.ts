import { Post, type PostsResponse } from "@/types/post";

export async function fetchPosts(): Promise<PostsResponse> {
  const response = await fetch("https://dummyjson.com/c/290b-f6b1-4896-8c91");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  console.log("data", data);

  return data;
}

export async function fetchPost(postId: string): Promise<Post> {
  let link = "";

  switch (postId) {
    case "post_101":
      link = "https://dummyjson.com/c/f320-ee18-4494-a53b";
      break;
    case "post_102":
      link = "https://dummyjson.com/c/e1da-b8d0-4f50-b977";
      break;
    case "post_103":
      link = "https://dummyjson.com/c/e901-d64d-48ab-bc2c";
      break;
    default:
      break;
  }

  const response = await fetch(link);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  console.log("data", data);

  return data;
}
