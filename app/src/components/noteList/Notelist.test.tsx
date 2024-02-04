import React from 'react';
import { render, screen } from '@testing-library/react';
import Notelist from './NoteList';

const MockChild1 = () => <div>child1</div>;
const MockChild2 = () => <div>child2</div>;

describe('rendering NoteList component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should render Content container component without crashing', async () => {
        render(
            <Notelist>
                <MockChild1 />
            </Notelist>
        );
    });
    it('should render childcomponents', () => {
        render(
            <Notelist>
                <MockChild1 />
                <MockChild2 />
            </Notelist>
        );
        expect(screen.getByText('child1')).toBeInTheDocument();
        expect(screen.getByText('child2')).toBeInTheDocument();
    });
});
