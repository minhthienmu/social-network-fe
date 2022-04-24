import { gql } from "@apollo/client";

export const queryAllPost = gql`
    query AllPost {
        allPost {
            id
            userId
            userFullName
            image
            date
            tag
            description
            numLikes
            numComments
            likes {
                userId
                userFullName
            }
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
