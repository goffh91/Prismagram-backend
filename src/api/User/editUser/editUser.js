import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: async (_, args, { request, isAuthenticated } ) => {
            isAuthenticated(request);
            const { user } = request;
            const { userName, avatar, email, firstName, lastName, bio } = args;
            return await prisma.updateUser({
                where: { id: user.id },
                data: { userName, avatar, email, firstName, lastName, bio }
            });
        }
    }
}