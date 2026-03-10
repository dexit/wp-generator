import { useMemo } from 'react';
import { CodeBase } from '../codebase/index';
import { blockSnippet } from '../codebase/block-snippet';
import { cptCode, taxonomyCode, screenCode, settingsCode, restCallbackCode, shortcodeCode, metaBoxCode, userRoleCode, assetRegistrationCode } from '../codebase/enhanced-snippets';
import { slug } from '../utils/helpers';

export const useFileTree = (state) => {
    return useMemo(() => {
        const { general, postTypes, taxonomies, adminScreens, settings, restCallbacks, shortcodes, metaBoxes, userRoles, assets, tables, mainMenu, hasBlocks, blockName, blockTitle } = state;
        const pluginSlug = slug(general.pluginName) || 'plugin-name';

        const tree = [
            { id: 'root', type: 'pluginName', directory: true, name: pluginSlug, parent_id: null },
            { id: 'root_includes', type: 'includes_dir', directory: true, name: 'includes', parent_id: 'root' },
            { id: 'root_admin', type: 'admin_dir', directory: true, name: 'Admin', parent_id: 'root_includes' },
            { id: 'admin_views', type: 'views_dir', directory: true, name: 'views', parent_id: 'root_admin' },
            { id: 'root_traits', type: 'traits_dir', directory: true, name: 'Traits', parent_id: 'root_includes' },
            {
                id: 'root_plugin_main', type: 'php', file: true, name: pluginSlug + '.php', parent_id: 'root',
                value: () => CodeBase.mainPluginCode(general)
            },
            {
                id: 'root_composer', type: 'json', file: true, name: 'composer.json', parent_id: 'root',
                value: () => CodeBase.composerCode(general)
            },
            {
                id: 'inc_functions', type: 'php', file: true, name: 'functions.php', parent_id: 'root_includes',
                value: () => CodeBase.functionsCode(general, tables)
            },
            {
                id: 'inc_installer', type: 'php', file: true, name: 'Installer.php', parent_id: 'root_admin',
                value: () => CodeBase.installerCode(general, tables)
            },
            {
                id: 'inc_admin', type: 'php', file: true, name: 'Admin.php', parent_id: 'root_includes',
                value: () => CodeBase.adminCode(general, tables)
            },
            {
                id: 'inc_menu', type: 'php', file: true, name: 'Menu.php', parent_id: 'root_admin',
                value: () => CodeBase.menuCode(general, tables, mainMenu)
            },
            {
                id: 'inc_trait_error', type: 'php', file: true, name: 'Form_Error.php', parent_id: 'root_traits',
                value: () => CodeBase.formErrorCode(general)
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

        tables.forEach(table => {
            if (table.settings && table.settings.adminPanel && table.settings.crudClassName) {
                const className = table.settings.crudClassName;
                const filePrefix = table.settings.fileNamePrefix || slug(className);

                tree.push({
                    id: `admin_handler_${className}`, type: 'php', file: true, name: `${className}.php`, parent_id: 'root_admin',
                    value: () => CodeBase.dynamicMenuPageHandler(general, table)
                });

                tree.push({
                    id: `admin_list_${className}`, type: 'php', file: true, name: `${className}_List.php`, parent_id: 'root_admin',
                    value: () => CodeBase.listTableCode(className + '_List', general, table)
                });

                tree.push({
                    id: `view_list_${className}`, type: 'php', file: true, name: `${filePrefix}-list.php`, parent_id: 'admin_views',
                    value: () => CodeBase.adminViewCode('list', general, table)
                });

                tree.push({
                    id: `view_new_${className}`, type: 'php', file: true, name: `${filePrefix}-new.php`, parent_id: 'admin_views',
                    value: () => CodeBase.adminViewCode('new', general, table)
                });

                tree.push({
                    id: `view_edit_${className}`, type: 'php', file: true, name: `${filePrefix}-edit.php`, parent_id: 'admin_views',
                    value: () => CodeBase.adminViewCode('edit', general, table)
                });
            }
        });

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
