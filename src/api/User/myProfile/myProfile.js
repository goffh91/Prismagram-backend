import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        myProfile: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return await prisma.user({ id: user.id });
        }
    }
}