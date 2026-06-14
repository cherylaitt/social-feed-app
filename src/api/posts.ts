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

export async function fetchPostsByUser(userId: string): Promise<PostsResponse> {
  let link = "";

  switch (userId) {
    case "user_01":
      link = "https://dummyjson.com/c/5704-3728-4533-ab4c";
      break;
    case "user_02":
      link = "https://dummyjson.com/c/4117-5922-43f9-a4cb";
      break;
    case "user_03":
      link = "https://dummyjson.com/c/7b55-fc9d-4466-9fed";
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
    case "post_104":
      link = "https://dummyjson.com/c/f5a3-ef6d-4338-a279";
      break;
    case "post_105":
      link = "https://dummyjson.com/c/773c-1918-4167-b796";
      break;
    case "post_106":
      link = "https://dummyjson.com/c/c2fe-e308-4ab0-ac51";
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
