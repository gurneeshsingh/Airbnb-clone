import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import  CredentialsProvider  from 'next-auth/providers/credentials';


export default NextAuth({
    adapter:MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
                password:{label:'Password', type:'password'}
            },
            async authorise({ credentials }) {
                console.log(credentials);
                return null
            }
            
        })
        
    ],
    session: {
        strategy:'jwt'
    },
    jwt: {
        secret:'thisisarandomjwtsecretline'
    },
    secret: process.env.SECRET,
    
    
})