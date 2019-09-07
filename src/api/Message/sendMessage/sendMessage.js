import { prisma } from "../../../../generated/prisma-client";
import { CHATROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user:fromUser } = request;
            const { chatRoomId, message, toUserId } = args;
            let chatRoom;
            if (chatRoomId === undefined) {
                if (fromUser.id !== toUserId) {
                    chatRoom = await prisma.createChatRoom({
                        participants: {
                            connect: [
                                { id: toUserId },
                                { id: fromUser.id }
                            ]
                        }
                    }).$fragment(CHATROOM_FRAGMENT);
                }
            } else {
                chatRoom = await prisma.chatRoom({ id: chatRoomId }).$fragment(CHATROOM_FRAGMENT);
            }
            if (!chatRoom) {
                throw Error("Fail to found/create the ChatRoom.");
            }
            const chatRoomUsers = chatRoom.participants.filter(
                participant => participant.id !== fromUser.id
            );
            return await prisma.createMessage({
                text: message,
                from: { connect: { id: fromUser.id } },
                to: { connect: { id : chatRoomId ? chatRoomUsers[0].id : toUserId }},
                chatRoom: { connect: { id: chatRoom.id }}
            });
        }
    }
}