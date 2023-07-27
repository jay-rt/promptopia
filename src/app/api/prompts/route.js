import Prompt from "@/models/Prompt";
import connectToDb from "@/utils/database";
import { getToken } from "next-auth/jwt";

export const GET = async (req) => {
  const token = await getToken({ req });
  if (!token)
    return new Response("You are not authorized to view this page", {
      status: 401,
    });
  try {
    await connectToDb();
    const prompts = await Prompt.find().populate("userId");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
