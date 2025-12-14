import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";
import type { Post } from "../types";
import Nav from "../Components/Nav";
import PostCard from "../Components/PostCard";

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
  const filteredPosts = posts?.filter((post: Post) =>
    post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  ) ?? [];
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )


  if (isPending) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <Nav />
      <input
        className="border rounded-lg px-2 py-1"
        type="search"
        placeholder="search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
