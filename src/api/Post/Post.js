import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        files: async ({ id }) => await prisma.post({ id }).files(),
        comments: async ({ id }) => await prisma.post({ id }).comments(),
        user: async ({ id }) => await prisma.post({ id }).user(),
        isLiked: async ({ id }, args, { request }) => {
            const { user } = request;
            return await prisma.$exists.like({
                AND: [
                    { post: { id } },
                    { user: { id: user.id } }
                ]
            });
        },
        likeCount: async ({ id }) => {
            return await prisma.likesConnection({
                where: { post: { id } }
            })
                .aggregate()
                .count();
        },
        commentCount: async ({ id }) => {
            return await prisma.commentsConnection({
                where: { post: { id } }
            })
                .aggregate()
                .count();
        }
    }
}
