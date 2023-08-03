"use client";

import PromptCard from "@/components/PromptCard";
import useData from "@/hooks/useData";
import handleError from "@/utils/handleError";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Profile = ({ params }) => {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useData(`/api/users/${params.id}`);
  const {
    isLoading: postsLoading,
    error: postsError,
    data: postsData,
    mutate: mutatePosts,
  } = useData(() => `/api/users/${userData._id}/posts`);

  const deletePrompt = async (id) => {
    try {
      const res = await fetch(`/api/prompts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        await handleError(res);
      }
      const message = await res.text();
      setMessage(message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deletePromptOptions = (id) => {
    return {
      optimisticData: (posts) => posts.filter((post) => post._id !== id), //applying local mutation to make changes feel faster
      rollbackOnError: true, //revert local cache to previous state if there is error
      populateCache: (res, posts) => posts.filter((post) => post._id !== id), //updating cache after mutation
      revalidate: false, //since the mutation already gives us update info, we don't have to revalidate it
    };
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (confirmDelete) {
      await mutatePosts(deletePrompt(id), deletePromptOptions(id));
    }
  };

  //splitting full name to get first name
  const firstname = userData?.fullname.split(" ")[0];
  return (
    <section className="w-full">
      {userError ? (
        userError.message
      ) : userLoading ? (
        "loading"
      ) : (
        <>
          <h1 className="head_text text-left">
            <span className="blue_gradient">{`${firstname}'s Profile`}</span>
          </h1>
          <p className="desc text-left">
            {session?.user.id === userData._id
              ? "Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
              : `Welcome to ${firstname}'s personalized profile page. Explore ${firstname}'s exceptional prompts and be inspired by the power of their imagination`}
          </p>
          <div className="mt-10 prompt_layout relative">
            {postsError
              ? postsError.message
              : postsLoading
              ? "loading"
              : postsData.map((post) => (
                  <PromptCard
                    key={post._id}
                    post={post}
                    user={userData}
                    onDelete={() => handleDelete(post._id)}
                  />
                ))}
          </div>
          {message && <span className="text-red-600">{message}</span>}
        </>
      )}
    </section>
  );
};

export default Profile;
