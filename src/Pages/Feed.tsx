import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";
import type { Post } from "../types";
import PostCard from "../Components/PostCard";
import searchIcon from "../icons/search.svg"

const Feed = () => {
  const [search, setSearch] = React.useState<string>("");
  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryFn: fetchPosts,
    queryKey: ["posts"],
  });
  const filteredPosts =
    posts?.filter((post: Post) =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ) ?? [];
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className="input-style w-full sm:w-54 flex items-center justify-between peer-focus-within:border-blue-500">
        <input
          className="focus:outline-none peer w-full"
          type="search"
          placeholder="search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="size-5" src={searchIcon} alt="search-icon" />
      </div>
      <div className="rid cols-2 wg-flex flex-col md:grid md:grid-cols-2 mt-4 gap-4 mb-4">
        {sortedPosts?.map((post: Post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            text={post.text}
            reactions={post.reactions}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
