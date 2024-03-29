import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ActiveNote from './ActiveNote';
import * as LabelsContainer from '../labels/Labels.container';
const MockChild = () => <div>child1</div>;

const dateMock = new Date('2024-01-26T19:01:55.644284');
const setActiveLabelMock = jest.fn();

const LabelsContainerMock = jest
    .spyOn(LabelsContainer, 'default')
    .mockImplementation(({ setActiveLabel }) => {
        return (
            <div
                onClick={() =>
                    setActiveLabel({
                        checked: true,
                        entity: 'entity',
                        name: 'name'
                    })
                }>
                LabelsContainer
            </div>
        );
    });
describe('rendering NoteList component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should render component without crashing', async () => {
        render(
            <ActiveNote noteDate={dateMock} setActiveLabel={setActiveLabelMock}>
                <MockChild />
            </ActiveNote>
        );
    });
    it('should render childcomponents', () => {
        render(
            <ActiveNote noteDate={dateMock} setActiveLabel={setActiveLabelMock}>
                <MockChild />
            </ActiveNote>
        );
        expect(screen.getByText('child1')).toBeInTheDocument();
    });

    it('should render date and time', () => {
        render(
            <ActiveNote noteDate={dateMock} setActiveLabel={setActiveLabelMock}>
                <MockChild />
            </ActiveNote>
        );
        expect(screen.getByText('Vrijdag 26 Januari 2024')).toBeInTheDocument();
        expect(screen.getByText('19:01')).toBeInTheDocument();
    });

    it('should call the labels container', () => {
        render(
            <ActiveNote noteDate={dateMock} setActiveLabel={setActiveLabelMock}>
                <MockChild />
            </ActiveNote>
        );
        expect(LabelsContainerMock).toHaveBeenCalled();
    });

    it('should execute the setActiveClass function when clicked on the labels', () => {
        render(
            <ActiveNote noteDate={dateMock} setActiveLabel={setActiveLabelMock}>
                <MockChild />
            </ActiveNote>
        );
        fireEvent.click(screen.getByText('LabelsContainer'));
        expect(setActiveLabelMock).toHaveBeenCalled();
    });
});
