import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useReactionMutation } from "../hooks/useReactionMutation";
import { REACTIONS } from "../constants/reactions";
import type { Post, PostReactions } from "../types";
import Reactions from "./Reactions";

const PostCard = (postData: Post) => {
  const naviagate = useNavigate();
  const reactionMutation = useReactionMutation();
  const postDate = formatDistanceToNow(
    new Date(postData.createdAt),
    { addSuffix: true }
  )

  const showDetails = () => {
    naviagate(`/posts/${postData.id}`, {
      state: {
        postData,
      },
    });
  };

  const handleReactionClick = (reaction: keyof PostReactions) => {
    reactionMutation.mutate({
      postId: postData.id,
      reaction,
      reactions: postData.reactions,
    });
  };

  return (
    <div className="p-4 flex-col border border-fuchsia-400 rounded-md mt-4 md:mt-0">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center w-3/5">
          <h2 className="font-bold text-xl text-gray-900">{postData.title}</h2>
          <p className="line-clamp-2 text-wrap text-gray-700">{postData.text}</p>
        </div>
        <button onClick={showDetails} className="button-style bg-blue-500 hover:bg-blue-800 transition-colors h-10">
          Read More
        </button>
      </div>
      <div className="flex justify-center sm:justify-start flex-wrap gap-4 mt-4 reaction-style">
        {REACTIONS.map(({ key, icon }) => (
          <Reactions
            key={key}
            icon={icon}
            count={postData.reactions[key]}
            onClick={() => handleReactionClick(key)}
          />
        ))}
      </div>
      <i className="text-gray-400">{postDate}</i>
    </div>
  );
};

export default PostCard;
