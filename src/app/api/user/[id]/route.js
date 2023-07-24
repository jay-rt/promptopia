import User from "@/models/User";
import connectToDb from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const user = await User.findOne({ _id: params.id });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to load user information");
  }
};
