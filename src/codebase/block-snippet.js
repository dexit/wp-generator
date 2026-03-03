export const blockSnippet = (data, blocks) => {
    // Generate code for a single block
    const block = blocks[0] || { name: 'example-block', title: 'Example Block' };
    const blockName = `${data.textDomain}/${block.name}`;

    const blockJson = {
        "$schema": "https://schemas.wp.org/trunk/block.json",
        "apiVersion": 3,
        "name": blockName,
        "version": "0.1.0",
        "title": block.title,
        "category": "widgets",
        "icon": "smiley",
        "description": "A custom block.",
        "supports": { "html": false },
        "textdomain": data.textDomain,
        "editorScript": "file:./index.js",
        "editorStyle": "file:./index.css",
        "style": "file:./style-index.css"
    };

    const editJs = `
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
    return (
        <p { ...useBlockProps() }>
            Hello from the editor!
        </p>
    );
}
`;

    const saveJs = `
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
    return (
        <p { ...useBlockProps.save() }>
            Hello from the frontend!
        </p>
    );
}
`;

    const indexJs = `
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
    edit: Edit,
    save,
} );
`;

    return {
        blockJson: JSON.stringify(blockJson, null, 4),
        editJs,
        saveJs,
        indexJs
    };
};
