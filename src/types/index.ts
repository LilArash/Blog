export type Post = {
  id: string;
  title: string;
  text: string;
  author?: string;
  image?: string;
  reactions: PostReactions;
  createdAt: string;
};

export type NewPost = Omit<Post, "id">;

export type UpdatePost = {
  id: string;
  updatedPost: NewPost;
};

export type FormFields = {
  title: string;
  text: string;
};

export type PostReactions = {
  like: number;
  dislike: number;
  heart: number;
  laughter: number;
  cup: number;
};

export type ReactionProps = {
  icon: string;
  count: number;
  onClick: () => void;
};

export type ReactionPayload = {
  postId: string;
  reaction: keyof PostReactions;
  reactions: PostReactions;
};

export type DeleteModalType = {
  openModal: () => void;
};

export type DeleteModalProps = {
  onConfirm: () => void;
  postTitle: string;
};

export type ToastType = "success" | "error";

export type Toast = {
  message: string;
  type: ToastType;
};

export type ToastContextType = {
  showToast: (toast: Toast) => void;
};

