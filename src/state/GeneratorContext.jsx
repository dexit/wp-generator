import React, { createContext, useContext, useState, useEffect } from 'react';
import { slug, titleCase } from '../utils/helpers';

const GeneratorContext = createContext();

export const useGenerator = () => useContext(GeneratorContext);

export const GeneratorProvider = ({ children }) => {
    // Basic Info
    const [general, setGeneral] = useState({
        pluginName: '', baseNamespace: '', pluginURI: '', description: '', version: '1.0.0', author: '',
        authorURI: '', authorEmail: '', license: 'GPLv2', licenseURI: '', textDomain: '', domainPath: '/languages',
        mainClassName: '', constantPrefix: '', functionPrefix: '',
    });

    // Custom Post Types
    const [postTypes, setPostTypes] = useState([]);

    // Taxonomies
    const [taxonomies, setTaxonomies] = useState([]);

    // Admin Screens (Edit Screens / Screen Options)
    const [adminScreens, setAdminScreens] = useState([]);

    // Options & Settings
    const [settings, setSettings] = useState([]);
    const [options, setOptions] = useState([]);

    // REST API Callbacks
    const [restCallbacks, setRestCallbacks] = useState([]);

    // Gutenberg Blocks
    const [hasBlocks, setHasBlocks] = useState(false);
    const [blockName, setBlockName] = useState('example-block');
    const [blockTitle, setBlockTitle] = useState('Example Block');

    // UI State
    const [activeFileName, setActiveFileName] = useState('');
    const [activeFileCodes, setActiveFileCodes] = useState('');

    const updateGeneral = (key, val) => {
        setGeneral(prev => {
            const next = { ...prev, [key]: val };
            // Auto-fill logic
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
        options, setOptions,
        restCallbacks, setRestCallbacks,
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
