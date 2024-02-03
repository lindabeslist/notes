import React, { useState } from 'react';

const allLabels = [
    { name: 'Persoonsgegeven', color: 'red', checked: true },
    { name: 'Plaats', color: 'yellow', checked: false },
    { name: 'voertuig', color: 'green', checked: false },
    { name: 'Signalering', color: 'blue', checked: false }
];

interface CheckboxProps {
    isChecked: boolean;
    label: string;
    checkHandler: () => void;
    index: number;
}

export const Checkbox = ({ isChecked, label, checkHandler, index }: CheckboxProps) => {
    return (
        <div>
            <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={isChecked}
                onChange={checkHandler}
            />
            <label htmlFor={`checkbox-${index}`}>{label}</label>
        </div>
    );
};

interface Props {
    setActiveClass: (activeClass: string) => void;
}

const Labels = ({ setActiveClass }: Props) => {
    const [labels, setLabels] = useState(allLabels);

    const updateCheckStatus = (index: number) => {
        setLabels(
            labels.map((label, currentIndex) => {
                if (currentIndex === index) setActiveClass(label.color);

                return currentIndex === index
                    ? { ...label, checked: !label.checked }
                    : { ...label, checked: false };
            })
        );
    };

    return (
        <div className="App">
            {labels.map((label, index) => (
                <Checkbox
                    key={label.name}
                    isChecked={label.checked}
                    checkHandler={() => updateCheckStatus(index)}
                    label={label.name}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Labels;
