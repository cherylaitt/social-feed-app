export type User = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  isVerified: boolean;
  bio: string;
  location: string;
  website: string;
  stats: {
    followerCount: number;
    followingCount: number;
    postCount: number;
  };
  joinedDate: string;
};
