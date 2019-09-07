import { prisma } from "../../../../generated/prisma-client";
import { CHATROOM_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeChatRoom: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            const canSee = await prisma.$exists.chatRoom({
                participants_some: { id: user.id }
            });
            if (canSee) {
                return await prisma.chatRoom({ id }).$fragment(CHATROOM_FRAGMENT);
            } else {
                throw Error("You cant't see this chatRoom.");
            }
        }
    }
}