import React from 'react';
import { useGenerator } from '../../../state/GeneratorContext';
import Card from '../card';
import FormTextInput from '../../Common/FormTextInput';

const Blocks = () => {
    const { hasBlocks, setHasBlocks, blockName, setBlockName, blockTitle, setBlockTitle } = useGenerator();

    return (
        <Card sectionName="Gutenberg Blocks (React)">
            <div className="row">
                <div className="col-md-12">
                    <div className="form-check form-switch mb-3">
                        <input className="form-check-input" type="checkbox" checked={hasBlocks} onChange={(e) => setHasBlocks(e.target.checked)} id="hasBlocks" />
                        <label className="form-check-label fw-bold" htmlFor="hasBlocks">Include Block Support</label>
                    </div>
                </div>
            </div>
            {hasBlocks && (
                <div className="row g-2">
                    <FormTextInput col={6} label="Block Name" value={blockName} onChange={setBlockName} placeholder="example-block" />
                    <FormTextInput col={6} label="Block Title" value={blockTitle} onChange={setBlockTitle} placeholder="Example Block" />
                    <div className="col-12 mt-2">
                        <div className="alert alert-info py-2 small">
                            <i className="fas fa-info-circle me-2"></i>Generates modern React blocks with <code>@wordpress/scripts</code>.
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default Blocks;
