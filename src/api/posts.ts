import axios from "axios";
import type { Post, NewPost, UpdatePost, PostReactions } from "../types";

const API_URL = "http://localhost:3500/posts";

export const fetchPosts = async () => {
  try {
    const res = await axios.get("/data/db.json");
    return res.data.posts;
  } catch (err) {
    console.log(err);
  }
};

export const addNewPost = async (newPost: NewPost): Promise<Post> => {
  const res = await axios.post(API_URL, newPost);
  return res.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updatePost = async ({
  id,
  updatedPost,
}: UpdatePost): Promise<Post> => {
  const res = await axios.patch(`${API_URL}/${id}`, updatedPost);
  return res.data;
};

export const reactionIncrement = async (
  postId: string,
  reaction: keyof PostReactions,
  currentReaction: PostReactions
): Promise<Post> => {
  const updatedReactions = {
    ...currentReaction,
    [reaction]: currentReaction[reaction] + 1,
  };
  const res = await axios.patch(`${API_URL}/${postId}`, {
    reactions: updatedReactions,
  });

  return res.data;
};
