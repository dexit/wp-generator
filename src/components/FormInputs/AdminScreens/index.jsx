import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const AdminScreens = () => {
    const { adminScreens, setAdminScreens, slug } = useGenerator();

    const add = () => setAdminScreens([...adminScreens, { title: '', menu_title: '', slug: '', icon: 'dashicons-admin-generic' }]);
    const remove = (i) => setAdminScreens(adminScreens.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...adminScreens];
        next[i][key] = val;
        if (key === 'title' && !next[i].slug) next[i].slug = slug(val);
        setAdminScreens(next);
    };

    return (
        <Card sectionName="Admin Edit Screens & Screen Options">
            {adminScreens.map((s, i) => (
                <div key={i} className="border-bottom mb-4 pb-3 position-relative">
                    <button className="btn-close position-absolute top-0 end-0" onClick={() => remove(i)}></button>
                    <div className="row g-2">
                        <FormTextInput col={6} label="Screen Title" value={s.title} onChange={(v) => update(i, 'title', v)} placeholder="My Screen" />
                        <FormTextInput col={6} label="Menu Title" value={s.menu_title} onChange={(v) => update(i, 'menu_title', v)} placeholder="My Menu" />
                        <FormTextInput col={6} label="Screen Slug" value={s.slug} onChange={(v) => update(i, 'slug', v)} placeholder="my-screen" />
                        <FormTextInput col={6} label="Menu Icon" value={s.icon} onChange={(v) => update(i, 'icon', v)} placeholder="dashicons-admin-generic" />
                    </div>
                </div>
            ))}
            <button className="btn btn-primary w-100" onClick={add}><i className="fas fa-plus me-2"></i>Add Admin Screen</button>
        </Card>
    );
};

export default AdminScreens;
