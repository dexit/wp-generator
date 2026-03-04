import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const Assets = () => {
    const { assets, setAssets } = useGenerator();

    const add = (type) => {
        const next = { ...assets };
        if (type === 'css') next.css.push({ handle: '', file: '', deps: '' });
        else next.js.push({ handle: '', file: '', deps: '', footer: true });
        setAssets(next);
    };

    const update = (type, i, key, val) => {
        const next = { ...assets };
        next[type][i][key] = val;
        setAssets(next);
    };

    return (
        <Card sectionName="Assets (CSS & JS)">
            <div className="mb-4">
                <h6 className="fw-bold small text-muted text-uppercase mb-3">Stylesheets</h6>
                {assets.css.map((a, i) => (
                    <div key={i} className="row g-2 mb-2">
                        <FormTextInput col={4} placeholder="Handle" value={a.handle} onChange={(v) => update('css', i, 'handle', v)} />
                        <FormTextInput col={8} placeholder="filename.css" value={a.file} onChange={(v) => update('css', i, 'file', v)} />
                    </div>
                ))}
                <button className="btn btn-sm btn-outline-primary" onClick={() => add('css')}>+ Add CSS</button>
            </div>
            <div>
                <h6 className="fw-bold small text-muted text-uppercase mb-3">Scripts</h6>
                {assets.js.map((a, i) => (
                    <div key={i} className="row g-2 mb-2">
                        <FormTextInput col={4} placeholder="Handle" value={a.handle} onChange={(v) => update('js', i, 'handle', v)} />
                        <FormTextInput col={6} placeholder="filename.js" value={a.file} onChange={(v) => update('js', i, 'file', v)} />
                        <div className="col-2 d-flex align-items-center">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={a.footer} onChange={(e) => update('js', i, 'footer', e.target.checked)} />
                            </div>
                        </div>
                    </div>
                ))}
                <button className="btn btn-sm btn-outline-primary" onClick={() => add('js')}>+ Add JS</button>
            </div>
        </Card>
    );
};

export default Assets;
