import { gql } from "@apollo/client";

export const queryAllPost = gql`
    query AllPost($last: Int) {
        allPost(last: $last) {
            id
            userId
            userFullName
            providerId
            providerName
            serviceId
            serviceName
            image
            description
            numLikes
            likes {
                userId
                userFullName
            }
            rate
            date
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

export const queryIsUserOrProvider = gql`
    query isUserOrProvider($isUserOrProviderId: ID!) {
        isUserOrProvider(id: $isUserOrProviderId)
    }
`;

export const queryProviderInfo = gql`
    query ProviderInfo($providerInfoId: ID!) {
        providerInfo(id: $providerInfoId) {
            id
            name
            address
        }
    }
`;
