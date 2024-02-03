import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {Note, ActiveNote, NoteRequest, NotesRequest, EnrichmentRequest} from "./datasource/notes.interface";
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
    async getNotes({ page, page_size, has_enrichment }: NotesRequest): Promise<Note[]> {
console.log('>>>>>>>>', has_enrichment)
        let hasEnrichment = ''
        if (typeof has_enrichment !== "undefined") hasEnrichment = `&has_enrichment=false`;

        console.log(`http://localhost:8080/api/v1/notes?page=${page}&page_size=${page_size}${hasEnrichment}`);
        return this.get(`http://localhost:8080/api/v1/notes?page=${page}&page_size=${page_size}${hasEnrichment}`)
    }

    async getNote({ note_id }: NoteRequest): Promise<ActiveNote> {
        return this.get(`http://localhost:8080/api/v1/notes/${note_id}`)
    }

    async enrichment({ note_id, enrichment }: EnrichmentRequest): Promise<ActiveNote> {
        return this.put(`http://localhost:8080/api/v1/notes/${note_id}/enrichment`, {body: enrichment})
    }

}

const noteTypedef = `
        id: String!
        source_id: String!
        prio: Int!
        text: String!
        has_enrichment: Boolean!
        date_created: String!
`

const typeDefs = `#graphql
    type Note {
        ${noteTypedef}
    }
    
    type Enrichments {
        start_pos: Int!
        end_pos: Int!
        selected_text: String!
        entity: String!
        description: String!    
    }
    
    input EnrichmentsMutation {
        start_pos: Int!
        end_pos: Int!
        entity: String!
        description: String!    
    }
   
    type ActiveNote {
        ${noteTypedef}
        Enrichments: [Enrichments!]
    }

    type Query {
        getNotes(page: Int!, page_size: Int!, has_enrichment: Boolean): [Note]
        getNote(note_id: String): ActiveNote
    }
    
    type Mutation {
      enrichment(note_id: String, enrichment: [EnrichmentsMutation]): ActiveNote
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

        getNote: async (
            parent: Record<string, unknown>,
            params: NoteRequest,
            { dataSources }: NotesResolversContext,
        ): Promise<ActiveNote> => {
            return await dataSources.notesAPI.getNote(params);
        },
    },
    Mutation: {
        enrichment : async (
            _, params: EnrichmentRequest, { dataSources }: NotesResolversContext) => {
            const note = await dataSources.notesAPI.enrichment(params);
            console.log(note);
            return note;
        },
    },

};

const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                notesAPI: new NotesAPI({ cache }),
            },
        };
    },
    listen: { port: 4000 },
});


console.log(`🚀  Server ready at: ${url}`);
