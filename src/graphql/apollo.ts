import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
    //uri: "http://localhost:8008/graphql",
    uri: "https://riviu-be-bbxu5.ondigitalocean.app/graphql",
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: "ws://riviu-be-bbxu5.ondigitalocean.app/graphql",
    }),
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    //uri: "https://riviu-be-bbxu5.ondigitalocean.app/graphql",
    //uri: "http://localhost:8008/graphql",
    cache: new InMemoryCache(),
});

export default client;
