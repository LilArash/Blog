import type { Post, PostReactions } from "../types";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { fetchPosts, deletePost } from "../api/posts";
import { useReactionMutation } from "../hooks/useReactionMutation";
import { REACTIONS } from "../constants/reactions";
import Nav from "../Components/Nav";
import Reactions from "../Components/Reactions";
import trashcan from "../icons/trashcan.svg";
import edit from "../icons/edit.svg";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const reactionMutation = useReactionMutation();

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
      navigate("/");
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

  if (!post) return <div>post not found</div>;

  return (
    <div>
      <Nav />
      <div className="flex justify-center max-w-2xl mx-auto mt-8">
        <div className="w-full">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center">{post.title}</h2>
            <p className="text-justify">{post.text}</p>
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
              onClick={() => {
                deletePostMutation.mutate(post.id);
              }}
              className="button-style bg-red-400"
            >
              delete
            </button>
            <button
              className="button-style bg-blue-500"
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
