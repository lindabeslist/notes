const NotesTypedefs = `#graphql
    type Note {
        id: String!
        source_id: String!
        prio: Int!
        text: String!
        has_enrichment: String!
        date_created: String!
    }

    type Query {
        getNotes(page: Int!, page_size: Int!): [Note!]!
    }
`;

export default NotesTypedefs;
