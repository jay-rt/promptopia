"use client";

import { useState } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import useData from "@/hooks/useData";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const { data: session } = useSession();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const { data, error, isLoading } = useData(session ? "/api/prompts" : null);

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

      {/** Only display prompts if user is logged in */}
      {session && (
        <div className="mt-16 prompt_layout">
          {error
            ? error.message
            : isLoading
            ? "loading"
            : data.map((post) => <PromptCard key={post._id} post={post} />)}
        </div>
      )}
    </section>
  );
};

export default Feed;
