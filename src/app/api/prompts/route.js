import Prompt from "@/models/Prompt";
import connectToDb from "@/utils/database";

export const GET = async (req) => {
  try {
    await connectToDb();
    const prompts = await Prompt.find().populate("userId");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDb();
    const newPrompt = new Prompt({ userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
