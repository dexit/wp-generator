import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const SettingsRegister = () => {
    const { settings, setSettings, slug } = useGenerator();

    const add = () => setSettings([...settings, { name: '', title: '', group: '', page: '' }]);
    const remove = (i) => setSettings(settings.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...settings];
        next[i][key] = val;
        if (key === 'title' && !next[i].name) next[i].name = slug(val, '_');
        setSettings(next);
    };

    return (
        <Card sectionName="Options & Settings API">
            {settings.map((s, i) => (
                <div key={i} className="border-bottom mb-4 pb-3 position-relative">
                    <button className="btn-close position-absolute top-0 end-0" onClick={() => remove(i)}></button>
                    <div className="row g-2">
                        <FormTextInput col={6} label="Setting Title" value={s.title} onChange={(v) => update(i, 'title', v)} placeholder="My Setting" />
                        <FormTextInput col={6} label="Option Name" value={s.name} onChange={(v) => update(i, 'name', v)} placeholder="my_option_name" />
                        <FormTextInput col={6} label="Option Group" value={s.group} onChange={(v) => update(i, 'group', v)} placeholder="my_plugin_group" />
                        <FormTextInput col={6} label="Page Slug" value={s.page} onChange={(v) => update(i, 'page', v)} placeholder="general" />
                    </div>
                </div>
            ))}
            <button className="btn btn-primary w-100" onClick={add}><i className="fas fa-plus me-2"></i>Add Setting</button>
        </Card>
    );
};

export default SettingsRegister;
