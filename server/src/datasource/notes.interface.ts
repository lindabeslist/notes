export interface Note {
    id: string;
    source_id: string
    prio: number;
    text: string;
    has_enrichment: boolean;
    date_created: string;
}

export interface NotesRequest {
    page: number;
    page_size: number;
}
