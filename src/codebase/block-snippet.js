export const blockSnippet = (data, blocks) => {
    const block = blocks[0] || { name: 'example-block', title: 'Example Block' };
    const blockName = `${data.textDomain}/${block.name}`;

    const blockJson = {
        "$schema": "https://schemas.wp.org/trunk/block.json",
        "apiVersion": 3,
        "name": blockName,
        "version": "1.0.0",
        "title": block.title,
        "category": "widgets",
        "icon": "smiley",
        "description": "Custom Gutenberg block.",
        "supports": { "html": false },
        "textdomain": data.textDomain,
        "editorScript": "file:./index.js",
        "editorStyle": "file:./index.css",
        "style": "file:./style-index.css"
    };

    const editJs = `import { useBlockProps } from '@wordpress/block-editor';\n\nexport default function Edit() {\n    return (\n        <p { ...useBlockProps() }>\n            Hello from the editor!\n        </p>\n    );\n}\n`;
    const saveJs = `import { useBlockProps } from '@wordpress/block-editor';\n\nexport default function save() {\n    return (\n        <p { ...useBlockProps.save() }>\n            Hello from the frontend!\n        </p>\n    );\n}\n`;
    const indexJs = `import { registerBlockType } from '@wordpress/blocks';\nimport Edit from './edit';\nimport save from './save';\nimport metadata from './block.json';\n\nregisterBlockType( metadata.name, {\n    edit: Edit,\n    save,\n} );\n`;

    return {
        blockJson: JSON.stringify(blockJson, null, 4),
        editJs,
        saveJs,
        indexJs
    };
};
