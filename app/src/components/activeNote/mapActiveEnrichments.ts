import { ActiveEnrichment } from '../Notes.interface';

const mapEnrichments = (enrichments: ActiveEnrichment[] | undefined) => {
    if (!enrichments) return [];

    return enrichments.map((enrichment) => ({
        start: enrichment.start_pos,
        end: enrichment.end_pos,
        text: enrichment.entity,
        className: ''
    }));
};

export default mapEnrichments;
