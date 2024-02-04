import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ActiveNoteContainer from './ActiveNote.container';
import * as Highlight from './highlight/Highlight';
import * as ActiveNote from './ActiveNote';
import * as Editor from '../editor/Editor';
import * as SaveButton from '../saveButton/SaveButton';
import { ENRICHMENT } from './ActiveNote.gql';
import { MockedProvider } from '@apollo/client/testing';

const mockHiglightedRange = {
    className: 'classname',
    end: 10,
    start: 1,
    selected_text: 'test',
    entity: 'PERSON'
};

const HightlightMock = jest
    .spyOn(Highlight, 'default')
    .mockImplementation(({ setHighlightedRanges }) => (
        <div onClick={() => setHighlightedRanges([mockHiglightedRange])}>Highlight</div>
    ));
const ActiveNotetMock = jest
    .spyOn(ActiveNote, 'default')
    .mockImplementation(({ children }) => <div>ActiveNote{children}</div>);
const EditortMock = jest
    .spyOn(Editor, 'default')
    .mockImplementation(({ setEditorValue }) => (
        <div onClick={() => setEditorValue('content')}>Editor</div>
    ));
const SaveButtonMock = jest
    .spyOn(SaveButton, 'default')
    .mockImplementation(({ handleClick }) => <div onClick={handleClick}>SaveButton</div>);

const mockActiveNote = {
    date_created: '2022-02-04',
    has_enrichment: true,
    id: 'id',
    prio: 2,
    source_id: '',
    text: 'Sample Text',
    enrichments: [
        {
            start_pos: 0,
            end_pos: 10,
            selected_text: 'test',
            entity: 'entity',
            description: 'test'
        }
    ]
};
const gqlResultTrigger = jest.fn();

const mocks = [
    {
        request: {
            query: ENRICHMENT,
            variables: {
                noteId: 'id',
                enrichment: [
                    {
                        start_pos: 0,
                        end_pos: 10,
                        entity: 'entity',
                        description: ''
                    }
                ]
            }
        },
        result: () => {
            gqlResultTrigger();
            return {
                data: {
                    enrichment: mockActiveNote
                }
            };
        }
    }
];

const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
        <MockedProvider addTypename={false} mocks={mocks}>
            {children}
        </MockedProvider>
    );
};

describe('ActiveNoteContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders ActiveNoteContainer without crashing', () => {
        render(<ActiveNoteContainer activeNote={mockActiveNote} />, { wrapper });

        expect(screen.getByText('ActiveNote')).toBeInTheDocument();
    });

    it('should call the highlight component with correct props', () => {
        render(<ActiveNoteContainer activeNote={mockActiveNote} />, { wrapper });

        expect(screen.getByText('Highlight')).toBeInTheDocument();
        expect(HightlightMock).toHaveBeenCalledWith(
            expect.objectContaining({
                activeLabel: {
                    checked: true,
                    color: 'purple',
                    entity: 'PERSON',
                    name: 'Persoonsgegeven'
                },
                highlightedRanges: [
                    {
                        className: '',
                        end: 10,
                        entity: 'entity',
                        selected_text: 'test',
                        start: 0
                    }
                ],
                text: 'Sample Text'
            }),
            {}
        );
    });

    it('should call the active not component with correct props', () => {
        render(<ActiveNoteContainer activeNote={mockActiveNote} />, { wrapper });

        expect(screen.getByText('ActiveNote')).toBeInTheDocument();
        expect(ActiveNotetMock).toHaveBeenCalledWith(
            expect.objectContaining({
                noteDate: new Date('2022-02-04T00:00:00.000Z')
            }),
            {}
        );
    });

    it('should call the editor component with correct props', () => {
        render(<ActiveNoteContainer activeNote={mockActiveNote} />, { wrapper });

        expect(screen.getByText('Editor')).toBeInTheDocument();
        expect(EditortMock).toHaveBeenCalledWith(
            expect.objectContaining({
                editorValue: ''
            }),
            {}
        );
    });

    it('should call the saveButton component with correct props', () => {
        render(<ActiveNoteContainer activeNote={mockActiveNote} />, { wrapper });

        expect(screen.getByText('SaveButton')).toBeInTheDocument();
        expect(SaveButtonMock).toHaveBeenCalledWith(
            expect.objectContaining({
                isButtonDisabled: true
            }),
            {}
        );
    });

    it('Should enable saveButton when text is highlighted', async () => {
        render(<ActiveNoteContainer activeNote={mockActiveNote} />, { wrapper });

        fireEvent.click(screen.getByText('Highlight'));

        expect(SaveButtonMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
                isButtonDisabled: false
            }),
            {}
        );
    });

    it('Should enable saveButton when description is added in the editor', async () => {
        render(<ActiveNoteContainer activeNote={mockActiveNote} />, { wrapper });

        fireEvent.click(screen.getByText('Editor'));

        expect(SaveButtonMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
                isButtonDisabled: false
            }),
            {}
        );
    });

    it('Should handleClick when clicked on the save button', async () => {
        render(<ActiveNoteContainer activeNote={mockActiveNote} />, { wrapper });

        fireEvent.click(screen.getByText('SaveButton'));

        expect(SaveButtonMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
                isButtonDisabled: true
            }),
            {}
        );

        await waitFor(() => {
            expect(gqlResultTrigger).toHaveBeenCalled();
        });
    });
});
