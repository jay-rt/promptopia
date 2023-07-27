import Prompt from "@/models/Prompt";
import connectToDb from "@/utils/database";
import { getToken } from "next-auth/jwt";

export const GET = async (req, { params }) => {
  const token = await getToken({ req });
  if (!token)
    return new Response("You are not authorized to view this page", {
      status: 401,
    });
  try {
    await connectToDb();
    const posts = await Prompt.find({ userId: params.id });
    if (!posts) return new Response("User hasn't created any post yet");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user's all prompts", { status: 500 });
  }
};
