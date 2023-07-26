import User from "@/models/User";
import connectToDb from "@/utils/database";
import { getToken } from "next-auth/jwt";

export const GET = async (req, { params }) => {
  const token = await getToken({ req });
  if (!token)
    return new Response("You are not authorized to view this page", {
      status: 401,
    });
  try {
    await connectToDb();
    const user = await User.findById(params.id);
    if (!user) return new Response("User not found", { status: 404 });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to load user information", { status: 500 });
  }
};
