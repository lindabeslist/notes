import React, { useState } from 'react';
import Labels from './Labels';

export interface AllLabel {
    name: string;
    checked: boolean;
    entity: string;
}

export const allLabels: AllLabel[] = [
    { name: 'Persoonsgegeven', checked: true, entity: 'PERSON' },
    { name: 'Plaats', checked: false, entity: 'LOCATION' },
    { name: 'Bedrijf', checked: false, entity: 'ORGANIZATION' },
    { name: 'Signalering', checked: false, entity: 'SIGNAL' }
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
                    entity={label.entity}
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
