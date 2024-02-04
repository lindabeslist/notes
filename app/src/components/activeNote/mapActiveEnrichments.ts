import { ActiveEnrichment } from '../Notes.interface';
import { allLabels } from '../labels/Labels.container';

const mapEnrichments = (enrichments: ActiveEnrichment[] | undefined) => {
    if (!enrichments) return [];

    return enrichments.map((enrichment) => {
        const label = allLabels.find((label) => enrichment.entity === label.entity);
        return {
            start: enrichment.start_pos,
            end: enrichment.end_pos,
            selected_text: enrichment.selected_text,
            entity: enrichment.entity,
            className: label?.color || ''
        };
    });
};

export default mapEnrichments;
