import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const Taxonomy = () => {
    const { taxonomies, setTaxonomies, slug } = useGenerator();

    const add = () => setTaxonomies([...taxonomies, { name: '', singular: '', plural: '', hierarchical: true, show_in_rest: true }]);
    const remove = (i) => setTaxonomies(taxonomies.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...taxonomies];
        next[i][key] = val;
        if (key === 'singular' && !next[i].name) next[i].name = slug(val, '_');
        setTaxonomies(next);
    };

    return (
        <Card sectionName="Custom Taxonomies">
            {taxonomies.map((tax, i) => (
                <div key={i} className="border-bottom mb-4 pb-3 position-relative">
                    <button className="btn-close position-absolute top-0 end-0" onClick={() => remove(i)}></button>
                    <div className="row g-2">
                        <FormTextInput col={4} label="Singular Name" value={tax.singular} onChange={(v) => update(i, 'singular', v)} placeholder="Genre" />
                        <FormTextInput col={4} label="Plural Name" value={tax.plural} onChange={(v) => update(i, 'plural', v)} placeholder="Genres" />
                        <FormTextInput col={4} label="Taxonomy Key" value={tax.name} onChange={(v) => update(i, 'name', v)} placeholder="genre" />

                        <div className="col-md-6">
                            <div className="form-check form-switch mt-2">
                                <input className="form-check-input" type="checkbox" checked={tax.hierarchical} onChange={(e) => update(i, 'hierarchical', e.target.checked)} id={`tax-h-${i}`} />
                                <label className="form-check-label" htmlFor={`tax-h-${i}`}>Hierarchical (like categories)</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-check form-switch mt-2">
                                <input className="form-check-input" type="checkbox" checked={tax.show_in_rest} onChange={(e) => update(i, 'show_in_rest', e.target.checked)} id={`tax-rest-${i}`} />
                                <label className="form-check-label" htmlFor={`tax-rest-${i}`}>Show in REST API</label>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button className="btn btn-primary w-100" onClick={add}><i className="fas fa-plus me-2"></i>Add Taxonomy</button>
        </Card>
    );
};

export default Taxonomy;
