import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const DatabaseTables = () => {
    const { tables, setTables, slug } = useGenerator();

    const addTable = () => {
        setTables([...tables, {
            name: '',
            fields: [
                {
                    name: 'id', type: 'INT', length: '11', nullable: false, default: '', primary_key: true,
                    showInListTable: false, listTableColumnName: 'ID', sortableInListTable: true, linkActionInListTable: false,
                    showInCrudForm: false, formInputLabel: 'ID', formInputType: 'number', formInputPlaceholder: '', formInputRequired: false, formInputValues: ''
                }
            ],
            settings: {
                adminPanel: true, crudClassName: '', menuTitle: '', pageTitle: '', capability: 'manage_options',
                fileNamePrefix: '', nonceKey: '', submitButtonText: 'Add New', updateButtonText: 'Update',
                submitName: 'submit_data', singularName: '', pluralName: '', noItemFoundText: 'No items found',
                perPage: '20', pageSlug: ''
            }
        }]);
    };

    const removeTable = (i) => setTables(tables.filter((_, idx) => idx !== i));

    const updateTable = (i, key, val) => {
        const next = [...tables];
        next[i][key] = val;
        setTables(next);
    };

    const updateTableSettings = (i, key, val) => {
        const next = [...tables];
        next[i].settings = { ...next[i].settings, [key]: val };
        if (key === 'menuTitle' && !next[i].settings.pageTitle) next[i].settings.pageTitle = val;
        if (key === 'menuTitle' && !next[i].settings.pageSlug) next[i].settings.pageSlug = slug(val);
        setTables(next);
    };

    const addField = (ti) => {
        const next = [...tables];
        next[ti].fields.push({
            name: '', type: 'VARCHAR', length: '255', nullable: true, default: '', primary_key: false,
            showInListTable: true, listTableColumnName: '', sortableInListTable: true, linkActionInListTable: false,
            showInCrudForm: true, formInputLabel: '', formInputType: 'text', formInputPlaceholder: '', formInputRequired: true, formInputValues: ''
        });
        setTables(next);
    };

    const removeField = (ti, fi) => {
        const next = [...tables];
        next[ti].fields = next[ti].fields.filter((_, idx) => idx !== fi);
        setTables(next);
    };

    const updateField = (ti, fi, key, val) => {
        const next = [...tables];
        next[ti].fields[fi][key] = val;
        if (key === 'name' && !next[ti].fields[fi].listTableColumnName) {
            next[ti].fields[fi].listTableColumnName = val.charAt(0).toUpperCase() + val.slice(1);
        }
        if (key === 'name' && !next[ti].fields[fi].formInputLabel) {
            next[ti].fields[fi].formInputLabel = val.charAt(0).toUpperCase() + val.slice(1);
        }
        setTables(next);
    };

    return (
        <Card sectionName="Database Tables & CRUD Generator">
            {tables.map((table, ti) => (
                <div key={ti} className="border-bottom mb-5 pb-4 position-relative bg-white p-3 rounded shadow-sm">
                    <button className="btn-close position-absolute top-0 end-0 m-2" onClick={() => removeTable(ti)}></button>

                    <div className="row g-3 mb-4">
                        <FormTextInput col={12} label="Table Name (without prefix)" value={table.name} onChange={(v) => updateTable(ti, 'name', slug(v, '_'))} placeholder="e.g. customers" />
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold text-primary mb-3"><i className="fas fa-table me-2"></i>Fields</h6>
                        {table.fields.map((field, fi) => (
                            <div key={fi} className="border rounded p-3 mb-3 bg-light position-relative">
                                {!field.primary_key && <button className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-1 border-0" onClick={() => removeField(ti, fi)}><i className="fas fa-trash"></i></button>}
                                <div className="row g-2">
                                    <FormTextInput col={3} label="Name" value={field.name} onChange={(v) => updateField(ti, fi, 'name', slug(v, '_'))} disabled={field.primary_key} />
                                    <div className="col-md-3">
                                        <label className="form-label small fw-bold">Type</label>
                                        <select className="form-select form-select-sm" value={field.type} onChange={(e) => updateField(ti, fi, 'type', e.target.value)} disabled={field.primary_key}>
                                            <option value="INT">INT</option>
                                            <option value="VARCHAR">VARCHAR</option>
                                            <option value="TEXT">TEXT</option>
                                            <option value="LONGTEXT">LONGTEXT</option>
                                            <option value="DATETIME">DATETIME</option>
                                            <option value="FLOAT">FLOAT</option>
                                        </select>
                                    </div>
                                    <FormTextInput col={2} label="Length" value={field.length} onChange={(v) => updateField(ti, fi, 'length', v)} disabled={field.primary_key} />
                                    <div className="col-md-2 d-flex align-items-end mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={field.nullable} onChange={(e) => updateField(ti, fi, 'nullable', e.target.checked)} id={`null-${ti}-${fi}`} disabled={field.primary_key} />
                                            <label className="form-check-label small" htmlFor={`null-${ti}-${fi}`}>Null</label>
                                        </div>
                                    </div>
                                    {!field.primary_key && (
                                        <>
                                            <div className="col-12 mt-2">
                                                <div className="row g-2">
                                                    <div className="col-md-3">
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={field.showInListTable} onChange={(e) => updateField(ti, fi, 'showInListTable', e.target.checked)} id={`list-${ti}-${fi}`} />
                                                            <label className="form-check-label small" htmlFor={`list-${ti}-${fi}`}>Show in List</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={field.showInCrudForm} onChange={(e) => updateField(ti, fi, 'showInCrudForm', e.target.checked)} id={`form-${ti}-${fi}`} />
                                                            <label className="form-check-label small" htmlFor={`form-${ti}-${fi}`}>Show in Form</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {field.showInCrudForm && (
                                                <div className="col-12 mt-2 bg-white p-2 border rounded">
                                                    <div className="row g-2">
                                                        <FormTextInput col={4} label="Input Type" value={field.formInputType} onChange={(v) => updateField(ti, fi, 'formInputType', v)} helptext="text, number, textarea, checkbox, dropdown" />
                                                        <FormTextInput col={4} label="Form Label" value={field.formInputLabel} onChange={(v) => updateField(ti, fi, 'formInputLabel', v)} />
                                                        <FormTextInput col={4} label="Placeholder" value={field.formInputPlaceholder} onChange={(v) => updateField(ti, fi, 'formInputPlaceholder', v)} />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-sm btn-outline-secondary w-100" onClick={() => addField(ti)}><i className="fas fa-plus me-1"></i>Add Field</button>
                    </div>

                    <div className="bg-light p-3 rounded">
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" checked={table.settings.adminPanel} onChange={(e) => updateTableSettings(ti, 'adminPanel', e.target.checked)} id={`admin-${ti}`} />
                            <label className="form-check-label fw-bold" htmlFor={`admin-${ti}`}>Enable Admin CRUD UI</label>
                        </div>

                        {table.settings.adminPanel && (
                            <div className="row g-2">
                                <FormTextInput col={6} label="Menu Title" value={table.settings.menuTitle} onChange={(v) => updateTableSettings(ti, 'menuTitle', v)} />
                                <FormTextInput col={6} label="CRUD Class Name" value={table.settings.crudClassName} onChange={(v) => updateTableSettings(ti, 'crudClassName', v)} placeholder="e.g. Customer_Handler" />
                                <FormTextInput col={4} label="Singular Name" value={table.settings.singularName} onChange={(v) => updateTableSettings(ti, 'singularName', v)} placeholder="customer" />
                                <FormTextInput col={4} label="Plural Name" value={table.settings.pluralName} onChange={(v) => updateTableSettings(ti, 'pluralName', v)} placeholder="customers" />
                                <FormTextInput col={4} label="Page Slug" value={table.settings.pageSlug} onChange={(v) => updateTableSettings(ti, 'pageSlug', v)} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button className="btn btn-primary w-100 py-2 fw-bold" onClick={addTable}><i className="fas fa-plus-circle me-2"></i>Create New Database Table</button>
        </Card>
    );
};

export default DatabaseTables;
