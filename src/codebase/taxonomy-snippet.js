export const taxonomySnippet = (data, taxonomies) => {
    let registration = ``;
    taxonomies.forEach((tax) => {
        if (!tax.name) return;
        const labels = tax.labels || {
            name: tax.plural,
            singular_name: tax.singular,
        };
        registration += `
        register_taxonomy( '${tax.name}', ${JSON.stringify(tax.post_types || []).replace(/"/g, "'")}, [
            'labels'            => [
                'name'          => __( '${labels.name}', '${data.textDomain}' ),
                'singular_name' => __( '${labels.singular_name}', '${data.textDomain}' ),
            ],
            'hierarchical'      => ${tax.hierarchical === true},
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_rest'      => ${tax.show_in_rest !== false},
        ] );\n`;
    });

    return registration.trim();
};
