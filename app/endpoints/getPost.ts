import axios from "axios";

export const getPost = async (slug: string) => {
  const { data } = await axios.get(`/api/posts/${slug}`);
  return data;
};
