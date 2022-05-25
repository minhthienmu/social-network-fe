import { gql } from "@apollo/client";

export const queryAllPost = gql`
    query AllPost($request: queryAllPostRequest) {
        allPost(request: $request) {
            id
            userId
            userFullName
            avatar
            providerId
            providerName
            serviceId
            serviceName
            image
            description
            rate
            date
            numLikes
            numComments
            isLikeByUser
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

export const queryProviderInfo = gql`
    query ProviderInfo($providerInfoId: ID!) {
        providerInfo(id: $providerInfoId) {
            id
            name
            address
            serviceRate {
                serviceId
                serviceName
                sumRating
                totalRating
            }
        }
    }
`;

export const queryUserInfo = gql`
    query UserInfo($userId: ID!) {
        user(id: $userId) {
            fullName
            birthday
            avatar
            coverImage
            phoneNumber
        }
    }
`;

export const queryComment = gql`
    query QueryCommentPost($postId: ID!) {
        commentPost(postId: $postId) {
            id
            userId
            userFullName
            description
            createdAt
        }
    }
`;

export const queryIsFollowing = gql`
    query QueryIsFollowing($followerId: ID!, $followingId: ID!) {
        isFollowing(followerId: $followerId, followingId: $followingId)
    }
`;

export const querySearch = gql`
    query QuerySearch($keyword: String!) {
        search(keyword: $keyword) {
            user {
                id
                fullName
                avatar
            }
            provider {
                id
                name
                address
            }
            post {
                id
                userId
                userFullName
                avatar
                providerId
                providerName
                serviceId
                serviceName
                image
                date
                rate
                description
                numLikes
                numComments
            }
        }
    }
`;
