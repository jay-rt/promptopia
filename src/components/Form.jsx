"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import handleError from "@/utils/handleError";

const Form = ({ type, post, swrKey, method }) => {
  const router = useRouter();
  const [input, setInput] = useState(post);
  const { data: session, status } = useSession();

  const mutatePost = async (url, { arg }) => {
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(arg),
    });
    if (!res.ok) {
      await handleError(res);
    }
    router.push("/");
  };

  const { trigger, error, isMutating } = useSWRMutation(swrKey, mutatePost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await trigger({ ...input, id: session.user.id });
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated")
    return <p>Please sign in to create, edit and share prompts!</p>;

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      {error && <p>{error.message}</p>}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
        </label>
        <textarea
          name="prompt"
          value={input.prompt}
          onChange={handleChange}
          placeholder="Write down your prompt"
          required
          className="form_textarea"
        />
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc...)
            </span>
          </span>
        </label>
        <input
          name="tag"
          value={input.tag}
          onChange={handleChange}
          placeholder="#tag"
          required
          className="form_input"
        />
        <div className="flex-col">
          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isMutating}
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              {isMutating ? `${type}ing...` : type}
            </button>
          </div>
          {error && <span className="text-red-600">{error.message}</span>}
        </div>
      </form>
    </section>
  );
};

export default Form;
