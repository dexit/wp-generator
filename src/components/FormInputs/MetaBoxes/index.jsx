import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const MetaBoxes = () => {
    const { metaBoxes, setMetaBoxes, slug } = useGenerator();

    const add = () => setMetaBoxes([...metaBoxes, { id: '', title: '', screen: 'post' }]);
    const remove = (i) => setMetaBoxes(metaBoxes.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...metaBoxes];
        next[i][key] = val;
        if (key === 'id') next[i][id] = slug(val, '_');
        setMetaBoxes(next);
    };

    return (
        <Card sectionName="Meta Boxes Creator">
            {metaBoxes.map((mb, i) => (
                <div key={i} className="border-bottom mb-3 pb-3 position-relative">
                    <button className="btn-close position-absolute top-0 end-0" onClick={() => remove(i)}></button>
                    <div className="row g-2">
                        <FormTextInput col={6} label="Meta Box Title" value={mb.title} onChange={(v) => update(i, 'title', v)} placeholder="Item Details" />
                        <FormTextInput col={6} label="ID" value={mb.id} onChange={(v) => update(i, 'id', v)} placeholder="item_details" />
                        <FormTextInput col={12} label="Post Type / Screen" value={mb.screen} onChange={(v) => update(i, 'screen', v)} placeholder="post, page, or CPT key" />
                    </div>
                </div>
            ))}
            <button className="btn btn-outline-primary w-100" onClick={add}>+ Add Meta Box</button>
        </Card>
    );
};

export default MetaBoxes;
