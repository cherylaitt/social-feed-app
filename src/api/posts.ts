import { type PostsResponse } from "@/types/post";

export async function fetchPosts({
  pageName,
  timezone = "UTC",
}: {
  pageName: string;
  timezone?: string;
}): Promise<PostsResponse> {
  const link = `https://www.facebook.com/${pageName}`;

  console.log("fetching posts", link, timezone);

  const response = await fetch(
    `https://api.socialapis.io/facebook/pages/posts?link=${link}&timezone=${timezone}`,
    {
      headers: {
        "x-api-token":
          "b1d2fdf1defe1d2ad3a9d47798a0cb7128355eed2b89d001289ff6689d54ad85",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  console.log("data", data);

  return data.data;
}
