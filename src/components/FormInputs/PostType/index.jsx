import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const PostType = () => {
    const { postTypes, setPostTypes, slug } = useGenerator();

    const add = () => setPostTypes([...postTypes, {
        name: '', singular: '', plural: '',
        public: true, has_archive: true, show_in_rest: true,
        icon: 'dashicons-admin-post',
        supports: ['title', 'editor', 'thumbnail']
    }]);

    const remove = (i) => setPostTypes(postTypes.filter((_, idx) => idx !== i));

    const update = (i, key, val) => {
        const next = [...postTypes];
        next[i][key] = val;
        if (key === 'singular' && !next[i].name) next[i].name = slug(val, '_');
        setPostTypes(next);
    };

    const toggleSupport = (i, support) => {
        const next = [...postTypes];
        const current = next[i].supports || [];
        if (current.includes(support)) {
            next[i].supports = current.filter(s => s !== support);
        } else {
            next[i].supports = [...current, support];
        }
        setPostTypes(next);
    };

    return (
        <Card sectionName="Custom Post Types">
            {postTypes.map((pt, i) => (
                <div key={i} className="border-bottom mb-4 pb-3 position-relative">
                    <button className="btn-close position-absolute top-0 end-0" onClick={() => remove(i)}></button>
                    <div className="row g-2">
                        <FormTextInput col={4} label="Singular Name" value={pt.singular} onChange={(v) => update(i, 'singular', v)} placeholder="Book" />
                        <FormTextInput col={4} label="Plural Name" value={pt.plural} onChange={(v) => update(i, 'plural', v)} placeholder="Books" />
                        <FormTextInput col={4} label="Post Type Key" value={pt.name} onChange={(v) => update(i, 'name', v)} placeholder="book" />

                        <div className="col-md-3">
                            <div className="form-check form-switch mt-2">
                                <input className="form-check-input" type="checkbox" checked={pt.public} onChange={(e) => update(i, 'public', e.target.checked)} id={`pt-public-${i}`} />
                                <label className="form-check-label small" htmlFor={`pt-public-${i}`}>Public</label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-check form-switch mt-2">
                                <input className="form-check-input" type="checkbox" checked={pt.show_in_rest} onChange={(e) => update(i, 'show_in_rest', e.target.checked)} id={`pt-rest-${i}`} />
                                <label className="form-check-label small" htmlFor={`pt-rest-${i}`}>REST API</label>
                            </div>
                        </div>
                        <FormTextInput col={6} label="Dashicon" value={pt.icon} onChange={(v) => update(i, 'icon', v)} placeholder="dashicons-admin-post" />

                        <div className="col-12 mt-2">
                            <label className="form-label small fw-bold d-block">Supports</label>
                            {['title', 'editor', 'thumbnail', 'excerpt', 'comments', 'revisions'].map(s => (
                                <div key={s} className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox"
                                        checked={(pt.supports || []).includes(s)}
                                        onChange={() => toggleSupport(i, s)}
                                        id={`pt-sup-${i}-${s}`}
                                    />
                                    <label className="form-check-label small" htmlFor={`pt-sup-${i}-${s}`}>{s}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <button className="btn btn-primary w-100" onClick={add}><i className="fas fa-plus me-2"></i>Add Post Type</button>
        </Card>
    );
};

export default PostType;
