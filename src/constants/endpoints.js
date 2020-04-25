export const endpoints = Object.freeze({
    LOGIN: '/login',
    POSTS: '/posts',
    MY_POSTS: '/posts/mine',
    SEARCH: '/posts/search',
    STICKY: '/posts/sticky'
});

export const endpointFunctions = Object.freeze({
    VALIDATE: (postUUID) => `/posts/v/${postUUID}`,
    POSTS: (postUUID) => `/posts/${postUUID}`,
    LOGIN: (token) => `/login/${token}`,
})