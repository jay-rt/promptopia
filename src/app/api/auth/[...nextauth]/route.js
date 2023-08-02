import User from "@/models/User";
import connectToDb from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      //storing user id from JWT token to session
      session.accessToken = token.accessToken;
      session.user.id = token.id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDb();

        //check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        // create new user if user doesn't exist
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            fullname: profile.name,
            image: profile.picture,
          });
          console.log("Successfully created user");
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        await connectToDb();
        const signedInUser = await User.findOne({ email: user.email });
        token.accessToken = account.access_token;
        token.id = signedInUser._id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
