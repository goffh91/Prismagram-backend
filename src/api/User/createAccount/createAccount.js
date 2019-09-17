import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { 
                userName, email, 
                firstName="", lastName="", bio=""
            } = args;
            try {
                /*const user = */
                await prisma.createUser({
                    userName, email, 
                    firstName, lastName, bio
                });
                return true;
            } catch {
                return false;
            }
        }
    }
}