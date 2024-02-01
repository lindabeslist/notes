import React from 'react';
import styles from './NotesTitle.module.scss';

const NotesTitle = () => {
    return (
        <div className={styles.notesTitle}>
            <span>Status</span>
            <span>Prio</span>
            <span>Tijd</span>
            <span>Melding</span>
        </div>
    );
};

export default NotesTitle;
