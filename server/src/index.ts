import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import NotesApi from "./datasource/notes-api";
// import typeDefs from './typedefs';
// import resolvers from "./resolvers";
// import typeDefs from './typedefs/notes'
import {Note, NotesRequest} from "./datasource/notes.interface";
// import {GraphQLCustomContext, NotesResolversContext} from "./resolvers/notes";
import {RESTDataSource} from "@apollo/datasource-rest";

export interface NotesDataSources {
    notesAPI: NotesAPI;
}
export interface NotesResolversContext {
    dataSources: NotesDataSources;
}


export interface ContextValue {
    dataSources: {
        notesAPI: NotesAPI;

    };
}

class NotesAPI extends RESTDataSource {
    // override baseURL = 'http://localhost:8080/api/v1/notes';

    async getNotes({ page, page_size}: NotesRequest): Promise<Note[]> {
        // return this.get(`page${page}&page_size=${page_size}`);
        return this.get('http://localhost:8080/api/v1/notes?page=1&page_size=10')
    }
}

const typeDefs = `#graphql
    type Note {
        id: String!
        source_id: String!
        prio: Int!
        text: String!
        has_enrichment: String!
        date_created: String!
    }

    type Query {
        getNotes(page: Int!, page_size: Int!): [Note]
    }
`;


const resolvers = {
    Query: {
        getNotes: async (
            parent: Record<string, unknown>,
            params: NotesRequest,
            { dataSources }: NotesResolversContext,
        ): Promise<Note[]> => {
            return await dataSources.notesAPI.getNotes(params);
        },
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
});


const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            // We create new instances of our data sources with each request,
            // passing in our server's cache.
            dataSources: {
                notesAPI: new NotesAPI({ cache }),
            },
        };
    },
    listen: { port: 4000 },
});


console.log(`🚀  Server ready at: ${url}`);
