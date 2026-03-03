export const postTypeSnippet = (data, postTypes) => {
    let registration = ``;
    postTypes.forEach((pt) => {
        if (!pt.name) return;
        const labels = pt.labels || {
            name: pt.plural,
            singular_name: pt.singular,
        };
        registration += `
        register_post_type( '${pt.name}', [
            'labels'      => [
                'name'          => __( '${labels.name}', '${data.textDomain}' ),
                'singular_name' => __( '${labels.singular_name}', '${data.textDomain}' ),
            ],
            'public'      => ${pt.public !== false},
            'has_archive' => ${pt.has_archive !== false},
            'show_in_rest' => ${pt.show_in_rest !== false},
            'supports'    => ${JSON.stringify(pt.supports || ['title', 'editor', 'thumbnail']).replace(/"/g, "'")},
            'menu_icon'   => '${pt.menu_icon || 'dashicons-admin-post'}',
        ] );\n`;
    });

    return registration.trim();
};
