import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';
import { titleCase } from '../../../utils/helpers';

const Advanced = () => {
    const { general, updateGeneral, slug } = useGenerator();

    return (
        <Card sectionName="Advanced Configuration">
            <div className="row">
                <FormTextInput
                    label="Base Namespace"
                    value={general.baseNamespace}
                    onChange={(v) => updateGeneral('baseNamespace', titleCase(v).replace(/\s/g, '_'))}
                    helptext="e.g., MyPlugin\Core"
                />
                <FormTextInput
                    label="Main Class Name"
                    value={general.mainClassName}
                    onChange={(v) => updateGeneral('mainClassName', titleCase(v).replace(/\s/g, ''))}
                />
                <FormTextInput
                    label="Constant Prefix"
                    value={general.constantPrefix}
                    onChange={(v) => updateGeneral('constantPrefix', slug(v, '_').toUpperCase())}
                />
                <FormTextInput
                    label="Function Prefix"
                    value={general.functionPrefix}
                    onChange={(v) => updateGeneral('functionPrefix', slug(v, '_'))}
                />
            </div>
        </Card>
    );
};

export default Advanced;
