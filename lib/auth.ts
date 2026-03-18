import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import pool from "@/lib/db";
import { initDatabase } from "@/lib/init-db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  debug: true, // Enable NextAuth debug logs in terminal
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("--------------------------------------------------");
      console.log(">>> [AUTH PROTOCOL START]");
      console.log(">>> PROVIDER:", account?.provider);
      console.log(">>> EMAIL:", user.email);

      try {
        // Ensure tactical database schema is synchronized for first-time handshake
        await initDatabase();
        
        if (account?.provider === "google") {
          const { email, name } = user;
          if (!email) {
            console.error(">>> [SYNC FAILED] Google Identity returned no email.");
            return false;
          }

          console.log(">>> [SYNC] Validating identity in 'creatednewusertable'...");
          const checkQuery = "SELECT id FROM creatednewusertable WHERE email = $1";
          const res = await pool.query(checkQuery, [email]);
          
          let userId;
          if (res.rows.length === 0) {
            console.log(">>> [SYNC] Identity not found. Enrolling new operative...");
            const insertUserQuery = `
              INSERT INTO creatednewusertable (username, email)
              VALUES ($1, $2)
              RETURNING id;
            `;
            const newUserRes = await pool.query(insertUserQuery, [name || "Google User", email]);
            userId = newUserRes.rows[0].id;
            console.log(">>> [SYNC] Enrollment SUCCESS. Tactical ID:", userId);

            // Initialize form status for the new operative
            await pool.query(
              "INSERT INTO formfilledtable (user_id, email, status) VALUES ($1, $2, 0) ON CONFLICT (email) DO NOTHING",
              [userId, email]
            );
          } else {
            userId = res.rows[0].id;
            console.log(">>> [SYNC] Existing identity recognized. Tactical ID:", userId);
            
            // Ensure tracking record exists for legacy identities
            await pool.query(
              "INSERT INTO formfilledtable (user_id, email, status) VALUES ($1, $2, 0) ON CONFLICT (email) DO NOTHING",
              [userId, email]
            );
          }
          
          // Log tactical authentication event
          console.log(">>> [LOG] Recording session event...");
          await pool.query(
            "INSERT INTO userlogintable (user_id, email, password) VALUES ($1, $2, $3)",
            [userId, email, "GOOGLE_AUTH_SESSION"]
          );
          
          console.log(">>> [AUTH PROTOCOL SUCCESS] Identity Synchronized.");
          console.log("--------------------------------------------------");
          return true;
        }
      } catch (error) {
        console.error("--------------------------------------------------");
        console.error(">>> [AUTH PROTOCOL CRITICAL ERROR]:", error);
        console.error("--------------------------------------------------");
        // Fail the sign in if database sync fails to maintain data integrity
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log(">>> [REDIRECT] T-URL:", url, "| B-URL:", baseUrl);
      
      // Force tactical landing on /get-started for status verification
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return baseUrl + url;
      return baseUrl + "/get-started";
    },
    async jwt({ token, user, trigger, session }) {
      if (user?.email || token?.email) {
        const email = user?.email || token.email;
        try {
          const res = await pool.query(
            "SELECT id FROM creatednewusertable WHERE email = $1",
            [email]
          );
          if (res.rows.length > 0) {
            token.id = res.rows[0].id;
          }
        } catch (error) {
          console.error("JWT CALLBACK ERROR:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id || token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
