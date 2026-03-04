import React from 'react';
import { useGenerator } from '../../state/GeneratorContext';
import { useFileTree } from '../../state/useFileTree';

const GeneratedFilesTree = () => {
    const state = useGenerator();
    const tree = useFileTree(state);

    const renderTree = (pid = null) => {
        const items = tree.filter(i => i.parent_id === pid);
        if (items.length === 0) return null;

        return (
            <ul className="list-unstyled ps-3">
                {items.map((item) => (
                    <li key={item.id} className="mb-1">
                        <div
                            className={`cursor-pointer d-flex align-items-center p-1 rounded ${state.activeFileName === item.name ? 'bg-primary text-white shadow-sm' : 'hover-bg-light'}`}
                            onClick={() => {
                                if (item.file) {
                                    state.setActiveFileName(item.name);
                                    state.setActiveFileCodes(typeof item.value === 'function' ? item.value() : item.value);
                                }
                            }}
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            <i className={`fas \${item.directory ? 'fa-folder text-warning' : 'fa-file-code text-info'} me-2 \${state.activeFileName === item.name ? 'text-white' : ''}`}></i>
                            <span style={{ fontSize: '13px' }}>{item.name}</span>
                        </div>
                        {item.directory && renderTree(item.id)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="bg-white p-3 rounded shadow-sm border" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <h6 className="text-uppercase text-muted fw-bold mb-3 small" style={{ letterSpacing: '1px' }}>Project Explorer</h6>
            {renderTree(null)}
        </div>
    );
};

export default GeneratedFilesTree;
