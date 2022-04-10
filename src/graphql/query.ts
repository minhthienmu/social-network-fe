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
            likes {
                userFullName
            }
            comments {
                id
                userFullName
                description
            }
        }
    }
`;
