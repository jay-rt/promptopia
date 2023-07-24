import Prompt from "@/models/Prompt";
import connectToDb from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const posts = await Prompt.find({ userId: params.id });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user's all prompts", { status: 500 });
  }
};
