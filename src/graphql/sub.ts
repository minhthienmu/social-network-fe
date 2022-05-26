import { gql } from "@apollo/client";

export const notificationSubscription = gql`
    subscription notificationSubscription($userId: ID!) {
        notification(userId: $userId) {
            id
            fromUserId
            toUserId
            fromUserFullName
            postId
            type
        }
    }
`;
