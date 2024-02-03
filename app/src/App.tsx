import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import NotesContainer from './components/Notes.container';

export default function App() {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/',
        connectToDevTools: true,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <NotesContainer />
        </ApolloProvider>
    );
}
