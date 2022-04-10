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
