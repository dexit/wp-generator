import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const UserRoles = () => {
    const { userRoles, setUserRoles, slug } = useGenerator();

    const add = () => setUserRoles([...userRoles, { role: '', name: '', caps: 'read,edit_posts' }]);
    const remove = (i) => setUserRoles(userRoles.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...userRoles];
        next[i][key] = key === 'role' ? slug(val, '_') : val;
        setUserRoles(next);
    };

    return (
        <Card sectionName="User Roles & Capabilities">
            {userRoles.map((r, i) => (
                <div key={i} className="border-bottom mb-3 pb-3 position-relative">
                    <button className="btn-close position-absolute top-0 end-0" onClick={() => remove(i)}></button>
                    <div className="row g-2">
                        <FormTextInput col={6} label="Role Name (Display)" value={r.name} onChange={(v) => update(i, 'name', v)} placeholder="Manager" />
                        <FormTextInput col={6} label="Role Key" value={r.role} onChange={(v) => update(i, 'role', v)} placeholder="manager" />
                        <FormTextInput col={12} label="Capabilities (comma separated)" value={r.caps} onChange={(v) => update(i, 'caps', v)} placeholder="read, edit_posts, delete_posts" />
                    </div>
                </div>
            ))}
            <button className="btn btn-outline-primary w-100" onClick={add}>+ Add Custom Role</button>
        </Card>
    );
};

export default UserRoles;
