/**
 * @type Graphql middleware.
 * @param {Request Object} request 
 */
export const isAuthenticated = (request) => {
    if (!request.user)
        throw Error("You need to login to perform this action.");
    return;
}