import axios from "axios";

export const addComment = async (body: { id: string; comment: string }) => {
  const { data } = await axios.post(`/api/posts/comments/`, {
    id: body.id,
    message: body.comment,
  });
  return data;
};
