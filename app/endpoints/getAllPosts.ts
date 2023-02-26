import axios, { AxiosError } from "axios";

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
