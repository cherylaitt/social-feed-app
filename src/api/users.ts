import { User } from "@/types/user";

export async function fetchUser(userId: string): Promise<User> {
  let link = "";

  switch (userId) {
    case "user_01":
      link = "https://dummyjson.com/c/17fc-45d9-4bd5-803d";
      break;
    case "user_02":
      link = "https://dummyjson.com/c/bfb9-c42b-40ef-8ed3";
      break;
    case "user_03":
      link = "https://dummyjson.com/c/4d85-8d69-428b-a270";
      break;
    default:
      break;
  }

  const response = await fetch(link);

  if (!response.ok) {
    throw new Error("Failed to fetch the user");
  }

  const data = await response.json();
  console.log("data", data);

  return data;
}
