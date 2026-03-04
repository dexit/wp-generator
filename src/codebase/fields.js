import { slug } from '../utils/helpers';

export const validateFields = (data) => {
    return {
        ...data,
        pluginName: data.pluginName || "WP Plugin",
        textDomain: data.textDomain || slug(data.pluginName || "WP Plugin"),
        mainClassName: data.mainClassName || "Main",
        baseNamespace: data.baseNamespace || "WPPlugin",
        constantPrefix: data.constantPrefix || "WP_PLUGIN",
    };
};

export const validateTableSetting = (data) => {
    return {
        ...data,
        crudClassName: data.crudClassName || "WPGenerator",
        menuTitle: data.menuTitle || "WP Generator",
        capability: data.capability || "manage_options",
        fileNamePrefix: data.fileNamePrefix || "wp-generator",
        nonceKey: data.nonceKey || "wp-generator",
        submitButtonText: data.submitButtonText || "Submit",
        updateButtonText: data.updateButtonText || "Update",
        submitName: data.submitName || "submit-field",
        singularName: data.singularName || "item",
        pluralName: data.pluralName || "items",
        noItemFoundText: data.noItemFoundText || "Not found any item",
        perPage: data.perPage || "20",
        pageSlug: data.pageSlug || "wp-generator",
    };
};

export const validateRestApiSetting = (data) => {
    return {
        ...data,
        className: data.className || "Example",
        namespace: data.namespace || "wpgenerator/v1",
        restbase: data.restbase || "items",
    };
};
