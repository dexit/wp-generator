import { createStore } from 'vuex';
import { slug } from '../utils/helpers';
import { buildTreeData } from '../utils/buildtree';
import { CodeBase } from '../codebase/index';
import { blockSnippet } from '../codebase/block-snippet';

const storeOptions = {
  state: {
    fileArchitecture: [],
    filesTree: [
      { id: 'root', type: 'pluginName', directory: true, name: 'plugin_name', parent_id: null },
      { id: 'root_assets', type: 'assets_dir', directory: true, name: 'assets', parent_id: 'root' },
      { id: 'assets_css', type: 'css_dir', directory: true, name: 'css', parent_id: 'root_assets' },
      { id: 'assets_js', type: 'js_dir', directory: true, name: 'js', parent_id: 'root_assets' },
      { id: 'assets_images', type: 'images_dir', directory: true, name: 'images', parent_id: 'root_assets' },
      { id: 'root_includes', type: 'includes_dir', directory: true, name: 'includes', parent_id: 'root' },
      { id: 'includes_admin', type: 'admin_dir', directory: true, name: 'Admin', parent_id: 'root_includes' },
      { id: 'includes_admin_views', type: 'admin_dir', directory: true, name: 'views', parent_id: 'includes_admin' },
      {
        id: 'includes_admin_file', type: 'php', file: true, name: 'Menu.php', parent_id: 'includes_admin',
        value: () => CodeBase.menuCode(store.state.general, store.state.tables, store.state.mainMenu)
      },
      { id: 'includes_api', type: 'api_dir', directory: true, name: 'API', parent_id: 'root_includes' },
      { id: 'includes_frontend', type: 'frontend_dir', directory: true, name: 'Frontend', parent_id: 'root_includes' },
      {
        id: 'frontend_file', type: 'php', file: true, name: 'Shortcode.php', parent_id: 'includes_frontend',
        value: () => CodeBase.frontendShortcode(store.state.general)
      },
      { id: 'includes_traits', type: 'traits_dir', directory: true, name: 'Traits', parent_id: 'root_includes' },
      {
        id: 'traits_file', type: 'php', file: true, name: 'Form_Error.php', parent_id: 'includes_traits',
        value: () => CodeBase.formErrorCode(store.state.general)
      },
      {
        id: 'includes_admin_main', type: 'php', file: true, name: 'Admin.php', parent_id: 'root_includes',
        value: () => CodeBase.adminCode(store.state.general, store.state.tables)
      },
      {
        id: 'includes_api_main', type: 'php', file: true, name: 'Api.php', parent_id: 'root_includes',
        value: () => CodeBase.apiCode(store.state.general, store.state.restapi)
      },
      {
        id: 'includes_assets', type: 'php', file: true, name: 'Assets.php', parent_id: 'root_includes',
        value: () => CodeBase.assetsCode(store.state.general, store.state.assets)
      },
      {
        id: 'includes_frontend_main', type: 'php', file: true, name: 'Frontend.php', parent_id: 'root_includes',
        value: () => CodeBase.frontendCode(store.state.general)
      },
      {
        id: 'includes_installer', type: 'php', file: true, name: 'Installer.php', parent_id: 'root_includes',
        value: () => CodeBase.installerCode(store.state.general, store.state.tables)
      },
      {
        id: 'root_plugin_main_file', type: 'main-plugin-php-file', file: true, name: 'plugin_name.php', parent_id: 'root',
        value: () => CodeBase.mainPluginCode(store.state.general)
      },
      {
        id: 'root_composer_file', type: 'json', file: true, name: 'composer.json', parent_id: 'root',
        value: () => CodeBase.composerCode(store.state.general)
      },
      { id: 'root_readme_file', type: 'markdown', file: true, name: 'README.md', parent_id: 'root', value: () => CodeBase.readmeCode(store.state.general) },
      {
        id: 'includes_cpt', type: 'php', file: true, name: 'Post_Types.php', parent_id: 'root_includes',
        value: () => {
            const code = CodeBase.postTypeRegistration(store.state.general, store.state.postTypes);
            return `<?php\n\ndeclare(strict_types=1);\n\nnamespace ${store.state.general.baseNamespace};\n\nclass Post_Types {\n    public function __construct() {\n        add_action( 'init', [ $this, 'register' ] );\n    }\n    public function register(): void {\n${code}\n    }\n}`;
        }
      },
      {
        id: 'includes_tax', type: 'php', file: true, name: 'Taxonomies.php', parent_id: 'root_includes',
        value: () => {
            const code = CodeBase.taxonomyRegistration(store.state.general, store.state.taxonomies);
            return `<?php\n\ndeclare(strict_types=1);\n\nnamespace ${store.state.general.baseNamespace};\n\nclass Taxonomies {\n    public function __construct() {\n        add_action( 'init', [ $this, 'register' ] );\n    }\n    public function register(): void {\n${code}\n    }\n}`;
        }
      },
      // Blocks Support
      { id: 'root_src', type: 'src_dir', directory: true, name: 'src', parent_id: 'root' },
      { id: 'src_block', type: 'block_dir', directory: true, name: 'example-block', parent_id: 'root_src' },
      {
        id: 'block_json', type: 'json', file: true, name: 'block.json', parent_id: 'src_block',
        value: () => blockSnippet(store.state.general, [{ name: store.state.blockName, title: store.state.blockTitle }]).blockJson
      },
      {
        id: 'block_index_js', type: 'js', file: true, name: 'index.js', parent_id: 'src_block',
        value: () => blockSnippet(store.state.general, [{ name: store.state.blockName, title: store.state.blockTitle }]).indexJs
      },
      {
        id: 'block_edit_js', type: 'js', file: true, name: 'edit.js', parent_id: 'src_block',
        value: () => blockSnippet(store.state.general, [{ name: store.state.blockName, title: store.state.blockTitle }]).editJs
      },
      {
        id: 'block_save_js', type: 'js', file: true, name: 'save.js', parent_id: 'src_block',
        value: () => blockSnippet(store.state.general, [{ name: store.state.blockName, title: store.state.blockTitle }]).saveJs
      },
      {
        id: 'root_package_json', type: 'json', file: true, name: 'package.json', parent_id: 'root',
        value: () => JSON.stringify({
            name: slug(store.state.general.pluginName),
            version: store.state.general.version,
            scripts: { build: "wp-scripts build", start: "wp-scripts start" },
            devDependencies: { "@wordpress/scripts": "^26.0.0" }
        }, null, 4)
      }
    ],
    general: {
      pluginName: '', baseNamespace: '', pluginURI: '', description: '', version: '', author: '',
      authorURI: '', authorEmail: '', license: '', licenseURI: '', textDomain: '', domainPath: '',
      mainClassName: '', constantPrefix: '', functionPrefix: '',
    },
    mainMenu: { menuTitle: '', pageTitle: '', capability: '', pageSlug: '', },
    assets: { css: [], js: [], },
    activeFileCodes: '', activeFileName: '',
    tables: [], restapi: [], postTypes: [], taxonomies: [],
    hasBlocks: false, blockName: 'example-block', blockTitle: 'Example Block'
  },
  getters: {
    filesTree: (state) => state.filesTree.filter(item => {
        if (!state.hasBlocks && (item.id.includes('src_') || item.id.includes('block_') || item.id === 'root_package_json')) return false;
        return true;
    }),
    general: (state) => state.general,
    pluginName: (state) => state.general.pluginName,
    baseNamespace: (state) => state.general.baseNamespace,
    activeFileName: (state) => state.activeFileName,
    activeFileCodes: (state) => state.activeFileCodes,
    assets: (state) => state.assets,
    tables: (state) => state.tables,
    restapi: (state) => state.restapi,
    mainMenu: (state) => state.mainMenu,
  },
  mutations: {
    setPluginName(state, payload) {
      let name = slug(payload);
      if (state.fileArchitecture[0]) state.fileArchitecture[0].text = name;
      state.filesTree[0].name = name;
      state.general.pluginName = payload;
      state.filesTree.forEach((item) => { if (item.type === 'main-plugin-php-file') item.name = `${name}.php`; });
    },
    setGeneralData(state, payload) { state.general[payload.key] = payload.value; },
    setFileArchitecture(state, payload) { state.fileArchitecture = payload; },
    setActiveFileName(state, payload) { state.activeFileName = payload; },
    setActiveFileCodes(state, payload) { state.activeFileCodes = payload; },
    addNewAssets(state, payload) {
      if (payload.type === 'css') state.assets.css.push({ handle: '', style: '', dependency: '' });
      if (payload.type === 'js') state.assets.js.push({ handle: '', script: '', dependency: '', in_footer: false });
    },
    setAssetsData(state, payload) {
      state.assets[payload.type][payload.index][payload.key] = payload.value;
    },
    addNewTable(state) { state.tables.push({ name: '', settings: {}, fields: [] }); },
    addNewTableField(state, payload) { state.tables[payload.index].fields.push({ name: '', type: '', length: 11, nullable: false, primary_key: false, default: '', showInCrudForm: false }); },
    setTableData(state, payload) { state.tables[payload.index][payload.key] = payload.value; },
    setTableFieldData(state, payload) { state.tables[payload.index].fields[payload.fieldIndex][payload.key] = payload.value; },
    deleteTableField(state, payload) { state.tables[payload.index].fields.splice(payload.fieldIndex, 1); },
    deleteTable(state, payload) { state.tables.splice(payload.index, 1); },
    addNewFileInFileTree(state, payload) {
      if (payload.replace) state.filesTree = state.filesTree.filter(obj => obj.parent_id !== payload.id && obj.id !== payload.id);
      if (payload.name) state.filesTree.push(payload);
    },
    addNewRestApi(state, payload) { state.restapi.push({ enabled: payload, schemaFields: [] }); },
    setRestApiData(state, payload) { if (payload.type === 'reset') state.restapi[payload.index] = payload.value; else state.restapi[payload.index][payload.key] = payload.value; },
    deleteRestApi(state, payload) { state.restapi.splice(payload.index, 1); },
    setMainMenuData(state, payload) { state.mainMenu[payload.key] = payload.value; },
    ADD_POST_TYPE(state) { state.postTypes.push({ name: '', singular: '', plural: '' }); },
    REMOVE_POST_TYPE(state, index) { state.postTypes.splice(index, 1); },
    ADD_TAXONOMY(state) { state.taxonomies.push({ name: '', singular: '', plural: '', post_types: [] }); },
    REMOVE_TAXONOMY(state, index) { state.taxonomies.splice(index, 1); },
    SET_HAS_BLOCKS(state, payload) { state.hasBlocks = payload; },
    SET_BLOCK_NAME(state, payload) { state.blockName = payload; },
    SET_BLOCK_TITLE(state, payload) { state.blockTitle = payload; },
  },
  actions: {
    setPluginName({ commit, dispatch }, payload) { commit('setPluginName', payload); dispatch('setFileArchitecture', true); },
    setGeneralData({ commit }, payload) { commit('setGeneralData', payload); },
    addNewAssets({ commit }, payload) { commit('addNewAssets', payload); },
    setAssetsData({ commit, dispatch }, payload) { commit('setAssetsData', payload); dispatch('setFileArchitecture', true); },
    setActiveFileName({ commit }, payload) { commit('setActiveFileName', payload); },
    setActiveFileCodes({ commit }, payload) { commit('setActiveFileCodes', payload); },
    setFileArchitecture({ state, commit }, payload) { if (payload) { commit('setFileArchitecture', buildTreeData(store.getters.filesTree)); } },
    addNewTable({ commit }) { commit('addNewTable'); },
    addNewTableField({ commit }, payload) { commit('addNewTableField', payload); },
    setTableData({ commit }, payload) { commit('setTableData', payload); },
    setTableFieldData({ commit }, payload) { commit('setTableFieldData', payload); },
    deleteTableField({ commit }, payload) { commit('deleteTableField', payload); },
    deleteTable({ commit, dispatch }, payload) { commit('deleteTable', payload); dispatch('setFileArchitecture', true); },
    addNewFileInFileTree({ commit, dispatch }, payload) { commit('addNewFileInFileTree', payload); if (payload.setFileArchitecture === undefined) dispatch('setFileArchitecture', true); },
    addNewRestApi({ commit }, payload) { commit('addNewRestApi', payload); },
    setRestApiData({ commit }, payload) { commit('setRestApiData', payload); },
    deleteRestApi({ commit }, payload) { commit('deleteRestApi', payload); },
    setMainMenuData({ commit, dispatch }, payload) { commit('setMainMenuData', payload); dispatch('setFileArchitecture', true); },
    addPostType({ commit, dispatch }) { commit('ADD_POST_TYPE'); dispatch('setFileArchitecture', true); },
    removePostType({ commit, dispatch }, index) { commit('REMOVE_POST_TYPE', index); dispatch('setFileArchitecture', true); },
    addTaxonomy({ commit, dispatch }) { commit('ADD_TAXONOMY'); dispatch('setFileArchitecture', true); },
    removeTaxonomy({ commit, dispatch }, index) { commit('REMOVE_TAXONOMY', index); dispatch('setFileArchitecture', true); },
    setHasBlocks({ commit, dispatch }, payload) { commit('SET_HAS_BLOCKS', payload); dispatch('setFileArchitecture', true); },
    setBlockName({ commit, dispatch }, payload) { commit('SET_BLOCK_NAME', payload); dispatch('setFileArchitecture', true); },
    setBlockTitle({ commit, dispatch }, payload) { commit('SET_BLOCK_TITLE', payload); dispatch('setFileArchitecture', true); },
    deleteCrudViewFile({ dispatch }, payload) {
      ['new', 'edit', 'view', 'list'].forEach(item => dispatch('addNewFileInFileTree', { id: `includes_crud_admin_view_file_${item}_${payload.index}`, replace: true }));
    },
  },
};

const store = createStore(storeOptions);
export default store;
