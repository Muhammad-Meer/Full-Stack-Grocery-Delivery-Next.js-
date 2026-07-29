import connectDb from "@/lib/db"
import User from "@/models/user.model"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials:
      {
        userneam: { type: "email", label: "userneam", placeholder: "userneam", },
        password: { type: "password", label: "Password", placeholder: "*****", },
      },
      async authorize(credentials, request) {
        try {
          await connectDb()
          const email = await credentials.userneam
          const password = await credentials.password
          const user = await User.findOne({email})
          if(!user) {
           throw new Error("user does not exist")
          }

          const isMatch = await bcrypt.compare(password, user.password)
 
        } catch (error) {

        }

      },
    })
  ],
})