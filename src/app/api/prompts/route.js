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

export const POST = async (req) => {
  const { prompt, tag } = await req.json();
  const token = await getToken({ req });
  if (!token)
    return new Response("You are not authorized to view this page", {
      status: 401,
    });
  const userId = token.id;
  try {
    await connectToDb();
    const newPrompt = new Prompt({ userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
