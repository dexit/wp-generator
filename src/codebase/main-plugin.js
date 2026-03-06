export const mainPluginCode = (data) => {
  const mainClass = data.mainClassName || 'Main';
  const functionPrefix = data.functionPrefix || 'wp_plugin';

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
 * Main Plugin Class
 * Utilizing PHP 8.2 readonly principles for core configuration.
 */
final class ${mainClass} {
    public const VERSION = '${data.version || '1.0.0'}';

    /**
     * Constructor
     */
    private function __construct() {
        $this->define_constants();
        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Initialize singleton
     */
    public static function init(): self {
        static $instance = false;
        if ( ! $instance ) {
            $instance = new self();
        }
        return $instance;
    }

    /**
     * Define core constants
     */
    private function define_constants(): void {
        define( '${data.constantPrefix || 'WP_PLUGIN'}_VERSION', self::VERSION );
        define( '${data.constantPrefix || 'WP_PLUGIN'}_FILE', __FILE__ );
        define( '${data.constantPrefix || 'WP_PLUGIN'}_PATH', dirname( __FILE__ ) );
        define( '${data.constantPrefix || 'WP_PLUGIN'}_URL', plugins_url( '', __FILE__ ) );
    }

    /**
     * Kick off registrations
     */
    public function init_plugin(): void {
        if ( class_exists( __NAMESPACE__ . '\\Registers' ) ) {
            new Registers();
        }
    }
}

/**
 * Global accessor function
 */
function ${functionPrefix}(): ${mainClass} {
    return ${mainClass}::init();
}

// Start the plugin
${functionPrefix}();
`;
};
