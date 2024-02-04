import React from 'react';
import styles from './Toggle.module.scss';

interface SwitchProperties {
    id: string;
    label: string;
    onChange: (toggle: boolean) => void;
    isChecked: boolean;
}

const Switch: React.FC<SwitchProperties> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event.target.checked);
    };

    return (
        <label htmlFor={props.id} className={styles.switch}>
            <input
                id={props.id}
                type="checkbox"
                role="switch"
                checked={props.isChecked}
                onChange={onChange}
            />
            <div className={styles.switch__labesl}>
                <span id={`label-${props.id}`}>{props.label}</span>
            </div>
        </label>
    );
};

export default Switch;
