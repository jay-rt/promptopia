import Prompt from "@/models/Prompt";
import connectToDb from "@/utils/database";

export const GET = async (req) => {
  try {
    // await connectToDb();
    const prompts = await Prompt.find().populate("userId");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
