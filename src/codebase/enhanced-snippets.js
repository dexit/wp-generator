export const cptCode = (data, postTypes) => {
    let code = ``;
    postTypes.forEach(pt => {
        if (!pt.name) return;
        code += `
        register_post_type( '${pt.name}', [
            'labels'      => [
                'name'          => __( '${pt.plural || pt.name}', '${data.textDomain}' ),
                'singular_name' => __( '${pt.singular || pt.name}', '${data.textDomain}' ),
            ],
            'public'      => ${pt.public !== false},
            'has_archive' => ${pt.has_archive !== false},
            'show_in_rest' => ${pt.show_in_rest !== false},
            'supports'    => [ 'title', 'editor', 'thumbnail' ],
            'menu_icon'   => '${pt.icon || 'dashicons-admin-post'}',
        ] );\n`;
    });
    return code;
};

export const screenCode = (data, screens) => {
    let code = ``;
    screens.forEach(s => {
        if (!s.title) return;
        const slug = s.slug || s.title.toLowerCase().replace(/\s+/g, '-');
        code += `
        add_action( 'admin_menu', function() {
            $hook = add_menu_page(
                __( '${s.title}', '${data.textDomain}' ),
                __( '${s.menu_title || s.title}', '${data.textDomain}' ),
                'manage_options',
                '${slug}',
                function() {
                    echo '<div class="wrap"><h1>' . esc_html( get_admin_page_title() ) . '</h1></div>';
                },
                '${s.icon || 'dashicons-admin-generic'}'
            );

            add_action( "load-$hook", function() {
                add_screen_option( 'layout_columns', [ 'default' => 2, 'max' => 4 ] );
                // Help Tabs
                $screen = get_current_screen();
                $screen->add_help_tab( [
                    'id'      => '${slug}_help',
                    'title'   => __( 'Help', '${data.textDomain}' ),
                    'content' => '<p>' . __( 'Custom help content for ${s.title}', '${data.textDomain}' ) . '</p>',
                ] );
            } );
        } );\n`;
    });
    return code;
};

export const settingsCode = (data, settings) => {
    let code = ``;
    if (settings.length > 0) {
        code += `        add_action( 'admin_init', function() {\n`;
        settings.forEach(s => {
            code += `            register_setting( '${s.group || 'general'}', '${s.name}' );\n`;
            code += `            add_settings_section( '${s.name}_section', '${s.title}', null, '${s.page || 'general'}' );\n`;
        });
        code += `        } );\n`;
    }
    return code;
};

export const restCallbackCode = (data, callbacks) => {
    let code = ``;
    callbacks.forEach(cb => {
        if (!cb.route) return;
        code += `
        register_rest_route( '${cb.namespace || data.textDomain + '/v1'}', '${cb.route}', [
            'methods'             => '${cb.methods || 'GET'}',
            'callback'            => function( \\WP_REST_Request $request ) {
                return new \\WP_REST_Response( [ 'success' => true, 'message' => 'Response from ${cb.route}' ], 200 );
            },
            'permission_callback' => function() {
                return current_user_can( 'manage_options' );
            },
        ] );\n`;
    });
    return code;
};
export const taxonomyCode = (data, taxonomies) => {
    let code = ``;
    taxonomies.forEach(tax => {
        if (!tax.name) return;
        code += `
        register_taxonomy( '${tax.name}', [ 'post' ], [
            'labels'            => [
                'name'          => __( '${tax.plural || tax.name}', '${data.textDomain}' ),
                'singular_name' => __( '${tax.singular || tax.name}', '${data.textDomain}' ),
            ],
            'hierarchical'      => ${tax.hierarchical === true},
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_rest'      => ${tax.show_in_rest !== false},
        ] );\n`;
    });
    return code;
};
