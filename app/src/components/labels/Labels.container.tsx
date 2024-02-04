import React, { useState } from 'react';
import Labels from './Labels';

export interface AllLabel {
    name: string;
    color: string;
    checked: boolean;
    entity: string;
}

export const allLabels: AllLabel[] = [
    { name: 'Persoonsgegeven', color: 'purple', checked: true, entity: 'PERSON' },
    { name: 'Plaats', color: 'orange', checked: false, entity: 'LOCATION' },
    { name: 'voertuig', color: 'green', checked: false, entity: 'TRANSPORT' },
    { name: 'Signalering', color: 'blue', checked: false, entity: 'SIGNAL' }
];

interface Props {
    setActiveLabel: (label: AllLabel) => void;
}

const LabelsContainer = ({ setActiveLabel }: Props) => {
    const [labels, setLabels] = useState(allLabels);

    const updateCheckStatus = (index: number) => {
        setLabels(
            labels.map((label, currentIndex) => {
                if (currentIndex === index) {
                    setActiveLabel(label);
                }

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
