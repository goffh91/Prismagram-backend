import { prisma } from "../../../../generated/prisma-client";
import { CHATROOM_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeChatRooms: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return await prisma.chatRooms({
                where: { participants_some: { id: user.id } }
            }).$fragment(CHATROOM_FRAGMENT);
        }
    }
}