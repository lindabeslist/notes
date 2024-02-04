import { gql } from '@apollo/client';

export const GET_NOTES = gql`
    query GetNotes($pageSize: Int!, $page: Int!, $hasEnrichment: Boolean) {
        getNotes(page_size: $pageSize, page: $page, has_enrichment: $hasEnrichment) {
            date_created
            has_enrichment
            id
            prio
            source_id
            text
        }
    }
`;

export const GET_NOTE = gql`
    query GetNote($noteId: String) {
        getNote(note_id: $noteId) {
            Enrichments {
                start_pos
                end_pos
                selected_text
                entity
                description
            }
            id
            source_id
            prio
            text
            has_enrichment
            date_created
        }
    }
`;
