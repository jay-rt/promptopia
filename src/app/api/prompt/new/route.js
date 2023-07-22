import Prompt from "@/models/Prompt";
import connectToDb from "@/utils/database";

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
