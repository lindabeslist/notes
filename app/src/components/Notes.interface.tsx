export interface Note {
    id: string;
    source_id: string;
    prio: number;
    text: string;
    has_enrichment: boolean;
    date_created: string;
}
