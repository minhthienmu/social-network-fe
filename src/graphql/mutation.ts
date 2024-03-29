import { gql } from "@apollo/client";

export const loginMutation = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id
                fullName
                username
            }
        }
    }
`;

export const loginAdminMutation = gql`
    mutation LoginAdmin($username: String!, $password: String!) {
        loginAdmin(username: $username, password: $password)
    }
`;

export const registerMutation = gql`
    mutation Register($request: RegisterRequest) {
        register(request: $request)
    }
`;

export const createPostMutation = gql`
    mutation createPost($request: CreatePostRequest) {
        createPost(request: $request)
    }
`;

export const likeMutation = gql`
    mutation like($request: LikeRequest) {
        like(request: $request)
    }
`;

export const commentMutation = gql`
    mutation comment($request: CommentRequest) {
        comment(request: $request)
    }
`;

export const createProviderMutation = gql`
    mutation createProvider($request: CreateProviderRequest) {
        createProvider(request: $request)
    }
`;

export const followMutation = gql`
    mutation follow($followerId: ID!, $followingId: ID!) {
        follow(followerId: $followerId, followingId: $followingId)
    }
`;

export const unfollowMutation = gql`
    mutation unfollow($unfollowerId: ID!, $followingId: ID!) {
        unfollow(unfollowerId: $unfollowerId, followingId: $followingId)
    }
`;

export const sendMessageMutation = gql`
    mutation sendMessage($request: SendMessageRequest) {
        sendMessage(request: $request)
    }
`;

export const changePasswordMutation = gql`
    mutation changePassword($userId: ID!, $oldPassword: String!, $newPassword: String!) {
        changePassword(userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword)
    }
`;
