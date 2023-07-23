"use client";

import { useState } from "react";
import useSWR from "swr";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchPrompts = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      // Attach extra info to the error object.
      res.status === 404
        ? (error.message =
            "404: The resources that you are looking for doesn't exist")
        : (error.message = await res.text());
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  const { data, error, isLoading } = useSWR("/api/prompt", fetchPrompts);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
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
          : data.map((prompt) => <PromptCard key={prompt._id} />)}
      </div>
    </section>
  );
};

export default Feed;
