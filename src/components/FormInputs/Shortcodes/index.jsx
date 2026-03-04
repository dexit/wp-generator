import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const Shortcodes = () => {
    const { shortcodes, setShortcodes, slug } = useGenerator();

    const add = () => setShortcodes([...shortcodes, { tag: '' }]);
    const remove = (i) => setShortcodes(shortcodes.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...shortcodes];
        next[i][key] = slug(val, '_');
        setShortcodes(next);
    };

    return (
        <Card sectionName="Shortcodes Register">
            {shortcodes.map((s, i) => (
                <div key={i} className="border-bottom mb-3 pb-3 position-relative">
                    <button className="btn-close position-absolute top-0 end-0" onClick={() => remove(i)}></button>
                    <FormTextInput label="Shortcode Tag" value={s.tag} onChange={(v) => update(i, 'tag', v)} placeholder="my_shortcode" />
                </div>
            ))}
            <button className="btn btn-outline-primary w-100" onClick={add}>+ Add Shortcode</button>
        </Card>
    );
};

export default Shortcodes;
