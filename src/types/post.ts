export type Post = {
  id: string;
  attachments: any;
  details: {
    post_id: string;
    comments_count: string;
    share_count: string;
  };
  reactions: {
    Angry: number;
    Like: number;
    Love: number;
    Haha: number;
    Sad: number;
    Wow: number;
    Care: number;
    total_reaction_count: number;
  };
  top_comments: any;
  user_details: {
    name: string;
    profile_picture_url: string;
  };
  values: {
    post_id: string;
    publish_time: string;
    is_media: string;
    text: string;
    photo_image: string;
  };
};

export type PostsResponse = {
  posts: Post[];
};
