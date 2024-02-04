import mapEnrichments from './mapActiveEnrichments';

const enrichmentMock = {
    start_pos: 0,
    end_pos: 5,
    selected_text: 'example',
    entity: 'PERSON',
    description: ''
};

const enrichmentRespons = {
    start: 0,
    end: 5,
    selected_text: 'example',
    entity: 'PERSON',
    className: 'purple'
};

describe('mapEnrichments', () => {
    it('maps enrichments correctly with matching label', () => {
        const enrichments = [enrichmentMock];

        const mappedEnrichments = mapEnrichments(enrichments);

        expect(mappedEnrichments).toEqual([enrichmentRespons]);
    });

    it('maps enrichments correctly with no matching label', () => {
        const mappedEnrichments = mapEnrichments([{ ...enrichmentMock, entity: 'TEST' }]);

        expect(mappedEnrichments).toEqual([
            { ...enrichmentRespons, entity: 'TEST', className: '' }
        ]);
    });

    it('handles undefined enrichments', () => {
        const mappedEnrichments = mapEnrichments(undefined);

        expect(mappedEnrichments).toEqual([]);
    });

    it('handles empty enrichments array', () => {
        const mappedEnrichments = mapEnrichments([]);

        expect(mappedEnrichments).toEqual([]);
    });
});
