"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import useData from "@/hooks/useData";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);
  const { status } = useSession();

  useEffect(() => {
    searchText === "" && filteredPost.length !== 0 && setFilteredPost([]);
  }, [searchText, filteredPost]);

  const { data, error, isLoading } = useData(
    status === "authenticated" ? "/api/prompts" : null
  );

  const filteredPrompts = (search) => {
    const regex = new RegExp(search, "i"); //i flag for case insensetive search
    return data.filter(
      (post) =>
        regex.test(post.userId.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleTag = (tag) => {
    setSearchText(tag);
    const filter = filteredPrompts(tag);
    setFilteredPost(filter);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filter = filteredPrompts(searchText);
    setFilteredPost(filter);
  };

  if (status === "loading") return <p className="mt-16">Loading...</p>;
  if (status === "unauthenticated")
    return (
      <p className="mt-16">Please sign in to create, edit and share prompts!</p>
    );

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleChange}
          required
          className="search_input peer"
        />
      </form>
      <div className="mt-16 prompt_layout">
        {error
          ? error.message
          : isLoading
          ? "loading"
          : filteredPost.length !== 0
          ? filteredPost.map((post) => (
              <PromptCard key={post._id} post={post} handleTag={handleTag} />
            ))
          : data.map((post) => (
              <PromptCard key={post._id} post={post} handleTag={handleTag} />
            ))}
      </div>
    </section>
  );
};

export default Feed;
