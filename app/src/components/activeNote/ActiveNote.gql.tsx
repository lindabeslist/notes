import { gql } from '@apollo/client';

export const ENRICHMENT = gql`
    mutation Enrichment($noteId: String, $enrichment: [EnrichmentsMutation]) {
        enrichment(note_id: $noteId, enrichment: $enrichment) {
            id
            source_id
            prio
            text
            has_enrichment
            date_created
            Enrichments {
                start_pos
                end_pos
                selected_text
                entity
                description
            }
        }
    }
`;
