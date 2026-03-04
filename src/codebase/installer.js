export const installerCode = (data, tables) => {
    let tableSchemas = ``;
    tables.forEach((table) => {
        if (!table.name) return;
        let fields = `            id INT(11) NOT NULL AUTO_INCREMENT,\n`;
        table.fields.forEach((field) => {
            const length = field.length ? `(${field.length})` : '';
            const nullable = field.nullable ? 'NULL' : 'NOT NULL';
            const defaultValue = field.default ? `DEFAULT '${field.default}'` : '';
            fields += `            ${field.name} ${field.type}${length} ${nullable} ${defaultValue},\n`;
        });
        fields += `            PRIMARY KEY (id)`;

        tableSchemas += `
        \$schema = "CREATE TABLE IF NOT EXISTS {\$wpdb->prefix}${table.name} (
${fields}
        ) {\$collate};";

        if ( ! function_exists( 'dbDelta' ) ) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }
        dbDelta( \$schema );\n`;
    });

    return `<?php
/**
 * Installer Class
 */

declare(strict_types=1);

namespace ${data.baseNamespace}\\Admin;

/**
 * Class Installer
 */
class Installer {
    /**
     * Run the installer
     */
    public function run(): void {
        global $wpdb;
        $collate = $wpdb->get_charset_collate();
${tableSchemas}
    }
}
`;
};
