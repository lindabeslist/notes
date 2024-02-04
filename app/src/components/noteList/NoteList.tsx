import React from 'react';
import styles from './NoteList.module.scss';

interface Props {
    children: React.ReactNode;
}

const NoteList = ({ children }: Props) => {
    return <div className={styles.noteList}>{children}</div>;
};

export default NoteList;
