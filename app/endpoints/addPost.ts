import axios, { AxiosError } from "axios";

export const addPost = async (post: { title: string }) => {
  try {
    const { data } = await axios.post("/api/posts/addPost", post);
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
