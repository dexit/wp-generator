import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const General = () => {
    const { general, updateGeneral } = useGenerator();

    return (
        <Card sectionName="General Information">
            <div className="row">
                <FormTextInput
                    label="Plugin Name"
                    value={general.pluginName}
                    onChange={(v) => updateGeneral('pluginName', v)}
                    placeholder="My Awesome Plugin"
                />
                <FormTextInput
                    label="Plugin URI"
                    value={general.pluginURI}
                    onChange={(v) => updateGeneral('pluginURI', v)}
                    placeholder="https://example.com"
                />
                <FormTextInput
                    label="Description"
                    value={general.description}
                    onChange={(v) => updateGeneral('description', v)}
                    placeholder="Brief description of your plugin"
                    col={12}
                />
                <FormTextInput label="Version" value={general.version} onChange={(v) => updateGeneral('version', v)} col={4} />
                <FormTextInput label="Author" value={general.author} onChange={(v) => updateGeneral('author', v)} col={4} />
                <FormTextInput label="Author Email" value={general.authorEmail} onChange={(v) => updateGeneral('authorEmail', v)} col={4} />
                <FormTextInput label="Text Domain" value={general.textDomain} onChange={(v) => updateGeneral('textDomain', v)} col={6} />
                <FormTextInput label="Domain Path" value={general.domainPath} onChange={(v) => updateGeneral('domainPath', v)} col={6} />
            </div>
        </Card>
    );
};

export default General;
