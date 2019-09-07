import { prisma } from "../../../../generated/prisma-client";

export default {
    Subscription: {
        newMessage: {
            subscribe: async (_, args) => {
                const { chatRoomId } = args;
                return await prisma.$subscribe.message({
                    AND: [
                        { mutation_in: "CREATED" },
                        { node: { chatRoom: { id: chatRoomId } }
                    }]
                }).node();
            },
            resolve: payload => payload
        }
    }
}