"use client";

import PromptCard from "@/components/PromptCard";
import useData from "@/hooks/useData";
import { useSession } from "next-auth/react";

const Profile = ({ params }) => {
  const { data: session } = useSession();
  const user = useData(`/api/user/${params.id}`);
  const posts = useData(() => `/api/user/${user.data._id}/posts`);

  //splitting full name to get first name
  const firstname = user?.data?.fullname.split(" ")[0];
  return (
    <section className="w-full">
      {user.error ? (
        user.error.message
      ) : user.isLoading ? (
        "loading"
      ) : (
        <>
          <h1 className="head_text text-left">
            <span className="blue_gradient">{`${firstname}'s Profile`}</span>
          </h1>
          <p className="desc text-left">
            {session?.user.id === user.data._id
              ? "Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
              : `Welcome to ${firstname}'s personalized profile page. Explore ${firstname}'s exceptional prompts and be inspired by the power of their imagination`}
          </p>
          <div className="mt-10 prompt_layout">
            {posts.error
              ? posts.error.message
              : posts.isLoading
              ? "loading"
              : posts.data.map((post) => (
                  <PromptCard key={post._id} post={post} user={user.data} />
                ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
