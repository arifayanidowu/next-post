import axios from "axios";

export const getAuthPosts = async () => {
  const { data } = await axios.get("/api/posts/authPosts");
  return data;
};
