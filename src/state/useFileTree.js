import { useMemo } from 'react';
import { CodeBase } from '../codebase/index';
import { blockSnippet } from '../codebase/block-snippet';
import { cptCode, taxonomyCode, screenCode, settingsCode, restCallbackCode, shortcodeCode, metaBoxCode, userRoleCode, assetRegistrationCode } from '../codebase/enhanced-snippets';
import { slug } from '../utils/helpers';

export const useFileTree = (state) => {
    return useMemo(() => {
        const { general, postTypes, taxonomies, adminScreens, settings, restCallbacks, shortcodes, metaBoxes, userRoles, assets, hasBlocks, blockName, blockTitle } = state;
        const pluginSlug = slug(general.pluginName) || 'plugin-name';

        const tree = [
            { id: 'root', type: 'pluginName', directory: true, name: pluginSlug, parent_id: null },
            { id: 'root_includes', type: 'includes_dir', directory: true, name: 'includes', parent_id: 'root' },
            {
                id: 'root_plugin_main', type: 'php', file: true, name: pluginSlug + '.php', parent_id: 'root',
                value: () => CodeBase.mainPluginCode(general)
            },
            {
                id: 'inc_registers', type: 'php', file: true, name: 'Registers.php', parent_id: 'root_includes',
                value: () => {
                    const cpts = cptCode(general, postTypes);
                    const taxes = taxonomyCode(general, taxonomies);
                    const screens = screenCode(general, adminScreens);
                    const sets = settingsCode(general, settings);
                    const rests = restCallbackCode(general, restCallbacks);
                    const shorts = shortcodeCode(general, shortcodes);
                    const metas = metaBoxCode(general, metaBoxes);
                    const roles = userRoleCode(general, userRoles);
                    const enqueues = assetRegistrationCode(general, assets);

                    return `<?php\n\ndeclare(strict_types=1);\n\nnamespace ${general.baseNamespace || 'WPPlugin'};\n\n/**\n * Registers Class\n * Automatically generated with PHP 8.2 standards.\n */\nclass Registers {\n    public function __construct() {\n        add_action( 'init', [ $this, 'register_cpts' ] );\n        add_action( 'init', [ $this, 'register_taxonomies' ] );\n        add_action( 'init', [ $this, 'register_shortcodes' ] );\n        add_action( 'init', [ $this, 'register_roles' ] );\n        add_action( 'rest_api_init', [ $this, 'register_rest' ] );\n${screens ? '        add_action( \'admin_menu\', [ $this, \'register_screens\' ] );\n' : ''}${sets ? '        add_action( \'admin_init\', [ $this, \'register_settings\' ] );\n' : ''}${metas ? '        add_action( \'add_meta_boxes\', [ $this, \'register_meta_boxes\' ] );\n' : ''}${hasBlocks ? '        add_action( \'init\', [ $this, \'register_blocks\' ] );\n' : ''}\n${enqueues ? '        $this->register_enqueues();\n' : ''}    }\n\n    public function register_cpts(): void {\n${cpts || '        // No CPTs'}\n    }\n\n    public function register_taxonomies(): void {\n${taxes || '        // No Taxonomies'}\n    }\n\n    public function register_shortcodes(): void {\n${shorts || '        // No Shortcodes'}\n    }\n\n    public function register_roles(): void {\n${roles || '        // No Custom Roles'}\n    }\n\n    public function register_rest(): void {\n${rests || '        // No REST routes'}\n    }\n\n    public function register_screens(): void {\n${screens || '        // No Admin Screens'}\n    }\n\n    public function register_settings(): void {\n${sets || '        // No Settings'}\n    }\n\n    public function register_meta_boxes(): void {\n${metas || '        // No Meta Boxes'}\n    }\n\n    public function register_blocks(): void {\n        register_block_type( dirname( __FILE__, 2 ) . '/build/${blockName}' );\n    }\n\n    private function register_enqueues(): void {\n${enqueues}\n    }\n}`;
                }
            }
        ];

        if (hasBlocks) {
            tree.push({ id: 'root_src', type: 'src_dir', directory: true, name: 'src', parent_id: 'root' });
            const b = blockSnippet(general, [{ name: blockName, title: blockTitle }]);
            tree.push({ id: 'src_block', type: 'block_dir', directory: true, name: blockName, parent_id: 'root_src' });
            tree.push({ id: 'b_json', type: 'json', file: true, name: 'block.json', parent_id: 'src_block', value: () => b.blockJson });
            tree.push({ id: 'b_idx', type: 'js', file: true, name: 'index.js', parent_id: 'src_block', value: () => b.indexJs });
            tree.push({ id: 'b_edit', type: 'js', file: true, name: 'edit.js', parent_id: 'src_block', value: () => b.editJs });
            tree.push({ id: 'b_save', type: 'js', file: true, name: 'save.js', parent_id: 'src_block', value: () => b.saveJs });
        }

        return tree;
    }, [state]);
};
