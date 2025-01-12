import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./utils/db"
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email:", type: "email" },
        password: { label: "Password:", type: "password" },
      },
      authorize: async ({ email, password }) => {

        if (!email || !password) return null;
        const user = await prisma.user.findFirst({
          where: {
            email
          }
        })
        if(!user) throw Error("user does not exists");
        
        // @ts-ignore
        let bool=await bcrypt.compare(password,user.password)
        if(!bool) throw Error("Wrong password");          
        
        
        
        return {id:String(user.id),email:user.email}
      },


    })
  ],


  callbacks: {
    // This callback is called whenever a JWT  is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client). Anything you return here will be saved in the JWT and forwarded to the session callback. There you can control what should be returned to the client. Anything else will be kept from your frontend. The JWT is encrypted by default via your AUTH_SECRET environment variable.
    // jwt({token}) {
    //   const newtoken={...token,id:toke}
    //   return {...params.token,id:params.token.sub}
    // },
    //This callback is called whenever a session is checked. (i.e. when invoking the /api/session endpoint, using useSession or getSession). The return value will be exposed to the client, so be careful what you return here! If you want to make anything available to the client which you've added to the token through the JWT callback, you have to explicitly return it here as well.

    session({ session, token }) {

      // params.user.id=params.token.sub
      if (token.sub) session.userId = token.sub
      return session
    },
    // redirect({baseUrl,url}){


    // }

    //used to restrict some perticular users
    // signIn(params) {
    //   return false
    // },

  },
  pages: {


  },


})