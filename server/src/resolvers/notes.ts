import NotesApi from "../datasource/notes-api";
import {Note, NotesRequest} from "../datasource/notes.interface";

export interface GraphQLCustomContext {
    res: any;
}

export interface NotesDataSources {
    notesApi: NotesApi;
}
export interface NotesResolversContext extends GraphQLCustomContext{
    dataSources: NotesDataSources;
}




const notesResolvers = {
    Query: {
        getNotes: async (
            parent: Record<string, unknown>,
            params: NotesRequest,
            { dataSources }: NotesResolversContext,
        ): Promise<Note[]> => {
            return await dataSources.notesApi.getNotes(params);
        },
    },
};

export default notesResolvers;
