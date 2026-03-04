import React from 'react';
import FormInputs from '../components/FormInputs/index.jsx';
import GeneratedFilesTree from '../components/GeneratedFilesTree/index.jsx';
import { useGenerator } from '../state/GeneratorContext';
import * as monaco from 'monaco-editor';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useFileTree } from '../state/useFileTree';

const Home = () => {
    const state = useGenerator();
    const tree = useFileTree(state);
    const editorRef = React.useRef(null);
    const monacoRef = React.useRef(null);

    React.useEffect(() => {
        if (editorRef.current) {
            monacoRef.current = monaco.editor.create(editorRef.current, {
                value: state.activeFileCodes || '',
                language: 'php',
                theme: 'vs-dark',
                automaticLayout: true,
                readOnly: true,
                fontSize: 14,
                minimap: { enabled: false }
            });
        }
        return () => monacoRef.current?.dispose();
    }, []);

    React.useEffect(() => {
        if (monacoRef.current) {
            monacoRef.current.setValue(state.activeFileCodes || '');
            const ext = state.activeFileName.split('.').pop();
            const lang = ext === 'php' ? 'php' : (ext === 'js' ? 'javascript' : (ext === 'json' ? 'json' : 'plaintext'));
            monaco.editor.setModelLanguage(monacoRef.current.getModel(), lang);
        }
    }, [state.activeFileCodes, state.activeFileName]);

    const downloadZip = async () => {
        const zip = new JSZip();
        const pluginSlug = state.slug(state.general.pluginName) || 'plugin-name';

        tree.forEach(item => {
            if (!item.directory) {
                const code = typeof item.value === 'function' ? item.value() : item.value;
                zip.file(item.name, code || '');
            }
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${pluginSlug}.zip`);
    };

    return (
        <div className="container-fluid py-4 bg-light">
            <div className="row g-4">
                <div className="col-lg-4" style={{ height: '88vh', overflowY: 'auto' }}>
                    <FormInputs />
                </div>
                <div className="col-lg-3">
                    <GeneratedFilesTree />
                    <button className="btn btn-success w-100 mt-4 py-3 fw-bold shadow-sm rounded-3" onClick={downloadZip}>
                        <i className="fas fa-file-archive me-2"></i>Download Plugin ZIP
                    </button>
                    <div className="mt-4 p-3 bg-white rounded border small text-muted">
                        <h6 className="fw-bold text-dark small mb-2 text-uppercase">Summary</h6>
                        <ul className="ps-3 mb-0">
                            <li>PHP 8.2 Strict Types</li>
                            <li>CPT & Taxonomies</li>
                            <li>Admin Screens</li>
                            <li>Settings API</li>
                            <li>REST API Callbacks</li>
                            {state.hasBlocks && <li>Gutenberg Blocks</li>}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="sticky-top" style={{ top: '0px' }}>
                        <div className="bg-dark text-white p-2 rounded-top d-flex justify-content-between align-items-center border-bottom border-secondary">
                            <span className="ms-2 small fw-mono text-info">{state.activeFileName || 'Preview Code'}</span>
                            <button className="btn btn-sm btn-outline-light border-0" onClick={() => {
                                navigator.clipboard.writeText(state.activeFileCodes);
                                alert('Code copied!');
                            }}>
                                <i className="fas fa-copy"></i>
                            </button>
                        </div>
                        <div ref={editorRef} style={{ height: '83vh', borderRadius: '0 0 8px 8px', overflow: 'hidden' }} className="shadow-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
