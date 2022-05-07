import { gql } from "@apollo/client";

export const queryAllPost = gql`
    query AllPost($last: Int) {
        allPost(last: $last) {
            id
            userId
            userFullName
            image
            date
            description
            numLikes
            numComments
        }
    }
`;

export const queryComment = gql`
    query Comment($postId: ID!) {
        post(id: $postId) {
            comments {
                id
                userId
                userFullName
                description
                createdAt
            }
        }
    }
`;

export const queryLike = gql`
    query Likes {
        userFullName
    }
`;

export const queryAllProvider = gql`
    query AllProvider($last: Int) {
        allProvider(last: $last) {
            id
            name
            address
        }
    }
`;

export const queryAllService = gql`
    query AllService {
        allService {
            id
            name
        }
    }
`;
