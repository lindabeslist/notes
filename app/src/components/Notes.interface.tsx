export interface Note {
    id: string;
    source_id: string;
    prio: number;
    text: string;
    has_enrichment: boolean;
    date_created: string;
}

export interface ActiveNote {
    id: string;
    source_id: string;
    prio: number;
    text: string;
    has_enrichment: boolean;
    date_created: string;
    enrichments: {
        start_pos: number;
        end_pos: number;
        selected_text: string;
        entity: string;
        description: string;
    };
}

export interface Enrichment {
    start_pos: number;
    end_pos: number;
    entity: string;
    description: string;
}

export interface EnrichmentRequest {
    noteId: string;
    enrichment: Enrichment[];
}
