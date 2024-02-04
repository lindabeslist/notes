export interface Note {
    id: string;
    source_id: string;
    prio: number;
    text: string;
    has_enrichment: boolean;
    date_created: string;
}

export interface ActiveEnrichment {
    start_pos: number;
    end_pos: number;
    selected_text: string;
    entity: string;
    description: string;
}

export interface ActiveNote {
    date_created: string;
    enrichments: ActiveEnrichment[];
    has_enrichment: boolean;
    id: string;
    prio: number;
    source_id: string;
    text: string;
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

export interface HighlightedRange {
    end_pos: number;
    start_pos: number;
    selected_text: string;
    entity: string;
}
