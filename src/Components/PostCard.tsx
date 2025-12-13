import React from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { Post, PostReactions } from "../types";
import { reactionIncrement } from "../api/posts";

const PostCard = (postData: Post) => {
  const naviagate = useNavigate();
  const queryClient = useQueryClient() 

  const showDetails = () => {
    naviagate(`/posts/${postData.id}`, {
      state: {
        postData,
      },
    });
  };

  const reactionMutation = useMutation({
    mutationFn: ({
      postId, reaction, reactions
    } : {
      postId: string,  reaction: keyof PostReactions, reactions: PostReactions
    }) => reactionIncrement(postId, reaction, reactions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const handleReactionClick = (reaction: keyof PostReactions) => {
    reactionMutation.mutate({
      postId: postData.id,
      reaction,
      reactions: postData.reactions
    })
  }

  return (
    <div className="p-4 flex-col border rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center w-3/5">
          <h2 className="font-bold text-xl">{postData.title}</h2>
          <p className="line-clamp-2 text-wrap">{postData.text}</p>
        </div>
        <button onClick={showDetails} className="button-style bg-blue-500 h-10">
          read more
        </button>
      </div>
      <div className="flex gap-4 mt-4 reaction-style">
          <span onClick={() => handleReactionClick("like")}>
            👍 {Number(postData.reactions.like)}
          </span>
          <span onClick={() => handleReactionClick("dislike")}>
            👎 {Number(postData.reactions.dislike)}
          </span>
          <span onClick={() => handleReactionClick("heart")}>
            ❤ {Number(postData.reactions.heart)}
          </span>
          <span onClick={() => handleReactionClick("laughter")}>
            🤣 {Number(postData.reactions.laughter)}
          </span>
          <span onClick={() => handleReactionClick("cup")}>
            ☕ {Number(postData.reactions.cup)}
          </span>
      </div>
    </div>
  );
};

export default PostCard;
