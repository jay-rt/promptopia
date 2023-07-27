import Prompt from "@/models/Prompt";
import connectToDb from "@/utils/database";

//GET POST
export const GET = async (req, { params }) => {
  const token = await getToken({ req });
  if (!token)
    return new Response("You are not authorized to view this page", {
      status: 401,
    });
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
  const token = await getToken({ req });
  if (!token)
    return new Response("You are not authorized to view this page", {
      status: 401,
    });
  if (token.id !== params.id)
    return new Response("You can only edit your post");
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
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

//DELETE POST
export const DELETE = async (req, { params }) => {
  const token = await getToken({ req });
  if (!token)
    return new Response("You are not authorized to view this page", {
      status: 401,
    });
  if (token.id !== params.id)
    return new Response("You can only delete your post");
  try {
    await connectToDb();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Successfully deleted the post", { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};
