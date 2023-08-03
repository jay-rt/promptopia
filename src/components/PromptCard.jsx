"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, user, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleEdit = () => {
    router.push(`/edit/${post._id}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link
          href={user ? `/profile/${user._id}` : `/profile/${post.userId._id}`}
        >
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={user ? user.image : post.userId.image}
              alt="user_image"
              width={48}
              height={48}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {user ? user.username : post.userId.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {user ? user.email : post.userId.email}
              </p>
            </div>
          </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={copied ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer">
        #{post.tag}
      </p>
      {session.user.id === user?._id && (
        <div className="mt-5 flex justify-between items-center gap-4 border-t border-gray-200 pt-3">
          <button
            type="button"
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
