import { ActiveEnrichment } from '../Notes.interface';

const mapEnrichments = (enrichments: ActiveEnrichment[] | undefined) => {
    if (!enrichments) return [];

    return enrichments.map((enrichment) => {
        return {
            start_pos: enrichment.start_pos,
            end_pos: enrichment.end_pos,
            selected_text: enrichment.selected_text,
            entity: enrichment.entity
        };
    });
};

export default mapEnrichments;
