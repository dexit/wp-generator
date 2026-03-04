import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const RestApiCallbacks = () => {
    const { restCallbacks, setRestCallbacks, general } = useGenerator();

    const add = () => setRestCallbacks([...restCallbacks, { route: '', methods: 'GET', namespace: general.textDomain + '/v1' }]);
    const remove = (i) => setRestCallbacks(restCallbacks.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...restCallbacks];
        next[i][key] = val;
        setRestCallbacks(next);
    };

    return (
        <Card sectionName="WP REST API Custom Callbacks">
            {restCallbacks.map((cb, i) => (
                <div key={i} className="border-bottom mb-4 pb-3 position-relative">
                    <button className="btn-close position-absolute top-0 end-0" onClick={() => remove(i)}></button>
                    <div className="row g-2">
                        <FormTextInput col={6} label="Route Path" value={cb.route} onChange={(v) => update(i, 'route', v)} placeholder="/my-endpoint" />
                        <FormTextInput col={6} label="Namespace" value={cb.namespace} onChange={(v) => update(i, 'namespace', v)} placeholder="myplugin/v1" />
                        <div className="col-md-12">
                            <label className="form-label">HTTP Method</label>
                            <select className="form-select" value={cb.methods} onChange={(e) => update(i, 'methods', e.target.value)}>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                        </div>
                    </div>
                </div>
            ))}
            <button className="btn btn-primary w-100" onClick={add}><i className="fas fa-plus me-2"></i>Add REST Callback</button>
        </Card>
    );
};

export default RestApiCallbacks;
