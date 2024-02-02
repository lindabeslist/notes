export interface Note {
    id: string;
    source_id: string
    prio: number;
    text: string;
    has_enrichment: boolean;
    date_created: string;
}


export interface ActiveNote {
    id: string;
    source_id: string
    prio: number;
    text: string;
    has_enrichment: boolean;
    date_created: string;
    enrichments: {
        start_pos: number
        end_pos: number
        selected_text: string;
        entity: string;
        description: string;
    }
}

export interface NotesRequest {
    page: number;
    page_size: number;
}

export interface NoteRequest {
    note_id: string;
}

export interface Enrichment {
    start_pos; number;
    end_pos: number;
    entity: string;
    description: string;
}

export interface EnrichmentRequest {
    note_id: string;
    enrichment: Enrichment[];
}
