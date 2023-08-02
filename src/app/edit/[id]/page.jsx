"use client";

import Form from "@/components/Form";
import useData from "@/hooks/useData";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// const getPost = async (id, token) => {
//   const res = await fetch(`http://localhost:3000/api/prompts/${id}`, {
//     cache: "no-store",
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) {
//     return res.text();
//   }
//   return res.json();
// };

const Edit = ({ params }) => {
  const { isLoading, data, error } = useData(`/api/prompts/${params.id}`);
  // const session = await getServerSession(authOptions);
  // const accessToken = session && session.accessToken;
  // const post = await getPost(params.id, accessToken);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <Form
      type="Edit"
      post={data}
      swrKey={`/api/prompts/${params.id}`}
      method="PATCH"
    />
  );
};

export default Edit;
