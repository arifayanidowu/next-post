import axios, { AxiosError } from "axios";

export interface Post {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  published?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
  };
}

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get("/api/posts/getPosts");
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const err = error as AxiosError;
      throw new Error(
        (err?.response?.data as { error: string })?.error as string,
        {
          cause: err,
        }
      );
    }
  }
};
