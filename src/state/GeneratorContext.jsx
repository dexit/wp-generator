import React, { createContext, useContext, useState } from 'react';
import { slug, titleCase } from '../utils/helpers';

const GeneratorContext = createContext();

export const useGenerator = () => useContext(GeneratorContext);

export const GeneratorProvider = ({ children }) => {
    const [general, setGeneral] = useState({
        pluginName: '', baseNamespace: '', pluginURI: '', description: '', version: '1.0.0', author: '',
        authorURI: '', authorEmail: '', license: 'GPLv2', licenseURI: '', textDomain: '', domainPath: '/languages',
        mainClassName: '', constantPrefix: '', functionPrefix: '',
    });

    const [postTypes, setPostTypes] = useState([]);
    const [taxonomies, setTaxonomies] = useState([]);
    const [adminScreens, setAdminScreens] = useState([]);
    const [settings, setSettings] = useState([]);
    const [restCallbacks, setRestCallbacks] = useState([]);
    const [shortcodes, setShortcodes] = useState([]);
    const [metaBoxes, setMetaBoxes] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [assets, setAssets] = useState({ css: [], js: [] });

    const [hasBlocks, setHasBlocks] = useState(false);
    const [blockName, setBlockName] = useState('example-block');
    const [blockTitle, setBlockTitle] = useState('Example Block');

    const [activeFileName, setActiveFileName] = useState('');
    const [activeFileCodes, setActiveFileCodes] = useState('');

    const updateGeneral = (key, val) => {
        setGeneral(prev => {
            const next = { ...prev, [key]: val };
            if (key === 'pluginName') {
                const s = slug(val);
                next.textDomain = s;
                next.functionPrefix = s.replace(/-/g, '_');
                next.constantPrefix = next.functionPrefix.toUpperCase();
                next.mainClassName = titleCase(val).replace(/\s/g, '');
                next.baseNamespace = titleCase(val).replace(/\s/g, '');
            }
            return next;
        });
    };

    const value = {
        general, updateGeneral,
        postTypes, setPostTypes,
        taxonomies, setTaxonomies,
        adminScreens, setAdminScreens,
        settings, setSettings,
        restCallbacks, setRestCallbacks,
        shortcodes, setShortcodes,
        metaBoxes, setMetaBoxes,
        userRoles, setUserRoles,
        assets, setAssets,
        hasBlocks, setHasBlocks,
        blockName, setBlockName,
        blockTitle, setBlockTitle,
        activeFileName, setActiveFileName,
        activeFileCodes, setActiveFileCodes,
        slug, titleCase
    };

    return (
        <GeneratorContext.Provider value={value}>
            {children}
        </GeneratorContext.Provider>
    );
};
