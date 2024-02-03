import React from 'react';
import styles from './SaveButton.module.scss';

interface Props {
    handleClick: () => void;
    isButtonDisabled: boolean;
}
const SaveButton = ({ handleClick, isButtonDisabled }: Props) => {
    return (
        <button
            className={styles.saveButton}
            onClick={handleClick}
            type="button"
            disabled={isButtonDisabled}>
            Bewaar notitie
        </button>
    );
};

export default SaveButton;
