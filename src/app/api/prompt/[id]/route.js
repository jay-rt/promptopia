import Prompt from "@/models/Prompt";
import connectToDb from "@/utils/database";

//GET POST
export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

//EDIT POST
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    //Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};

//DELETE POST
export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Successfully deleted the post", { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};
