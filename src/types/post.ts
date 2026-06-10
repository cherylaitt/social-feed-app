export type Post = {
  id: string;
  message: string;
  authorName: string;
  authorAvatar?: string;
  publishedAt: string | number;
  url?: string;
  imageUrl?: string;
  commentsCount: number;
  reactionsCount: number;
  sharesCount: number;
};

export type PostsResponse = {
  posts: Post[];
};
