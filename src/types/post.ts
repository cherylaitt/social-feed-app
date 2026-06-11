export type Post = {
  id: string;
  author: {
    id: string;
    username: string;
    fullName: string;
    avatarUrl: string;
    isVerified: boolean;
    followerCount: number;
    bio: string;
  };
  content: string;
  media: Media[];
  engagement: {
    likes: number;
    shares: number;
  };
  timestamp: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  author: {
    username: string;
    avatarUrl: string;
  };
  text: string;
  timestamp: string;
};

export type Media = {
  id: string;
  type: "image" | "video";
  url: string;
  aspectRatio: string;
};

export type PostsResponse = {
  posts: Post[];
};
