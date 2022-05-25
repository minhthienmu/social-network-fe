import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    //uri: "https://riviu-be-bbxu5.ondigitalocean.app/graphql",
    uri: "http://localhost:8008/graphql",
    cache: new InMemoryCache(),
});

export default client;
