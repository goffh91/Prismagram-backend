import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        myProfile: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const myProfile = await prisma.user({ id: user.id });
            const myPosts = await prisma.user({ id: user.id }).posts();
            return {
                user: myProfile, 
                posts: myPosts
            };
        }
    }
}