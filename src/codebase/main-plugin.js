export const mainPluginCode = (data) => {
  return `<?php
/**
 * Plugin Name: ${data.pluginName || 'WP Plugin'}
 * Plugin URI: ${data.pluginURI || ''}
 * Description: ${data.description || ''}
 * Version: ${data.version || '1.0.0'}
 * Author: ${data.author || ''}
 * Author URI: ${data.authorURI || ''}
 * License: ${data.license || 'GPLv2'}
 * License URI: ${data.licenseURI || ''}
 * Text Domain: ${data.textDomain || ''}
 * Domain Path: ${data.domainPath || '/languages'}
 * 
 * @package ${data.pluginName || 'WP Plugin'}
 */

declare(strict_types=1);

namespace ${data.baseNamespace || 'WPPlugin'};

if ( ! defined( 'ABSPATH' ) ) {
    return;
}

/**
 * Main Class
 */
final class ${data.mainClassName || 'Main'} {
    public const VERSION = '${data.version || '1.0.0'}';

    private function __construct() {
        $this->define_constants();
        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    public static function init(): self {
        static $instance = false;
        if ( ! $instance ) {
            $instance = new self();
        }
        return $instance;
    }

    public function define_constants(): void {
        define( '${data.constantPrefix || 'WP_PLUGIN'}_VERSION', self::VERSION );
        define( '${data.constantPrefix || 'WP_PLUGIN'}_FILE', __FILE__ );
        define( '${data.constantPrefix || 'WP_PLUGIN'}_PATH', dirname( __FILE__ ) );
        define( '${data.constantPrefix || 'WP_PLUGIN'}_URL', plugins_url( '', __FILE__ ) );
    }

    public function init_plugin(): void {
        if ( class_exists( __NAMESPACE__ . '\\Registers' ) ) {
            new Registers();
        }
    }
}

function ${data.mainClassName ? data.mainClassName.toLowerCase() : 'wp_plugin'}(): ${data.mainClassName || 'Main'} {
    return ${data.mainClassName || 'Main'}::init();
}

${data.mainClassName ? data.mainClassName.toLowerCase() : 'wp_plugin'}();
`;
};
