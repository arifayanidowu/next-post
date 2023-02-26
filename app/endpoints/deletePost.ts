import axios from "axios";

export const deletePost = async (id: string) => {
  try {
    const { data } = await axios.delete(`/api/posts/deletePost`, {
      data: {
        id,
      },
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
