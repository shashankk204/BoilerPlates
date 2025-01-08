import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials:{
            email:{},
            password:{}

        },
        authorize:async (credentials)=>{
            // console.log()
            console.log(credentials)
            // return null
            return {email:"shashankk204",password:"0604"}
        }
    })
  ],
  callbacks:{
    
  }
})