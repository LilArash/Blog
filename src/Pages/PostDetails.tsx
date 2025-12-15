import type { Post, PostReactions, DeleteModalType } from "../types";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { fetchPosts, deletePost } from "../api/posts";
import { useReactionMutation } from "../hooks/useReactionMutation";
import { REACTIONS } from "../constants/reactions";
import { useToast } from "../context/ToastContext";
import Reactions from "../Components/Reactions";
import DeleteModal from "../Components/DeleteModal";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const reactionMutation = useReactionMutation();
  const modalRef = useRef<DeleteModalType>(null);
  const { showToast } = useToast();

  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryFn: fetchPosts,
    queryKey: ["posts"],
  });

  const post = posts?.find((p: Post) => p.id === id);

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showToast({ message: "Post Deleted Successfully", type: "success" });
      navigate('/')
    },
  });

  const postDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const redirectToEdit = () => {
    navigate(`/edit/${post.id}`, { state: { post } });
  };

  const handleReactionClick = (reaction: keyof PostReactions) => {
    reactionMutation.mutate({
      postId: post.id,
      reaction,
      reactions: post.reactions,
    });
  };

  const handleDeleteClick = () => {
    modalRef.current?.openModal();
  };

  if (!post) return <div>post not found</div>;

  return (
    <div>
      <DeleteModal
        ref={modalRef}
        postTitle={post.title}
        onConfirm={() => deletePostMutation.mutate(post.id)}
      />
      <div className="flex justify-center max-w-2xl mx-auto mt-8">
        <div className="w-full">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center text-gray-900">{post.title}</h2>
            <p className="text-justify text-gray-700">{post.text}</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 reaction-style">
            {REACTIONS.map(({ key, icon }) => (
              <Reactions
                key={key}
                icon={icon}
                count={post.reactions[key]}
                onClick={() => handleReactionClick(key)}
              />
            ))}
          </div>
          <i className="text-gray-400">{postDate}</i>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleDeleteClick}
              className="button-style bg-red-400 hover:bg-red-800 transition-colors"
            >
              delete
            </button>
            <button
              className="button-style bg-blue-500 hover:bg-blue-800 transition-colors"
              onClick={redirectToEdit}
            >
              edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
