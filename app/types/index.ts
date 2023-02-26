export interface PostType {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  published?: boolean;
  user?: UserType;
  comments?: CommentType[];
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  posts: PostType[];
  comments: CommentType[];
}

export interface CommentType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  userId: string;
  postId: string;
  user: UserType;
  post: PostType;
}

export interface AuthPostsType {
  posts: PostType[];
  user: UserType;
}
