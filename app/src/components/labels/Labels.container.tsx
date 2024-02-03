import React, { useState } from 'react';
import Labels from './Labels';

const allLabels = [
    { name: 'Persoonsgegeven', color: 'purple', checked: true },
    { name: 'Plaats', color: 'orange', checked: false },
    { name: 'voertuig', color: 'green', checked: false },
    { name: 'Signalering', color: 'blue', checked: false }
];

interface Props {
    setActiveClass: (activeClass: string) => void;
}

const LabelsContainer = ({ setActiveClass }: Props) => {
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
        <div>
            {labels.map((label, index) => (
                <Labels
                    key={label.name}
                    color={label.color}
                    isChecked={label.checked}
                    checkHandler={() => updateCheckStatus(index)}
                    label={label.name}
                    index={index}
                />
            ))}
        </div>
    );
};

export default LabelsContainer;
