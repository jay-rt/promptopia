import User from "@/models/User";
import connectToDb from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const user = await User.findById(params.id);
    if (!user) return new Response("User not found", { status: 404 });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to load user information", { status: 500 });
  }
};
