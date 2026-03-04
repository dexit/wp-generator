export const mainPluginCode = (data) => {
  let code = `<?php
/**
 * Plugin Name: ${data.pluginName}
 * Plugin URI: ${data.pluginURI}
 * Description: ${data.description}
 * Version: ${data.version}
 * Author: ${data.author}
 * Author URI: ${data.authorURI}
 * License: ${data.license}
 * License URI: ${data.licenseURI}
 * Text Domain: ${data.textDomain}
 * Domain Path: ${data.domainPath}
 * 
 * @package ${data.pluginName}
 */

declare(strict_types=1);

namespace ${data.baseNamespace};

// don't call the file directly
if ( ! defined( 'ABSPATH' ) ) {
    return;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * ${data.mainClassName} class
 */
final class ${data.mainClassName} {
    /**
     * Plugin version
     */
    public const VERSION = '${data.version}';

    /**
     * Holds various class instances.
     */
    private array $container = [];

    /**
     * Constructor for the ${data.mainClassName} class.
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );

        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Initializes the ${data.mainClassName}() class.
     */
    public static function init(): self {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     */
    public function __get( string $prop ): mixed {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop} ?? null;
    }

    /**
     * Magic isset to bypass referencing plugin.
     */
    public function __isset( string $prop ): bool {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants.
     */
    public function define_constants(): void {
        define( '${data.constantPrefix}_VERSION', self::VERSION );
        define( '${data.constantPrefix}_FILE', __FILE__ );
        define( '${data.constantPrefix}_PATH', dirname( ${data.constantPrefix}_FILE ) );
        define( '${data.constantPrefix}_INCLUDES', ${data.constantPrefix}_PATH . '/includes' );
        define( '${data.constantPrefix}_URL', plugins_url( '', ${data.constantPrefix}_FILE ) );
        define( '${data.constantPrefix}_ASSETS', ${data.constantPrefix}_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugins are loaded.
     */
    public function init_plugin(): void {
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Placeholder for activation function.
     */
    public function activate(): void {
        $installer = new Admin\\Installer();
        $installer->run();
    }

    /**
     * Placeholder for deactivation function.
     */
    public function deactivate(): void {
    }

    /**
     * Include the required files.
     */
    public function includes(): void {
        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin'] = new Admin\\Admin();
        }

        if ( $this->is_request( 'frontend' ) ) {
            $this->container['frontend'] = new Frontend\\Frontend();
        }
    }

    /**
     * Initialize the hooks.
     */
    public function init_hooks(): void {
        add_action( 'init', [ $this, 'init_classes' ] );
        add_action( 'init', [ $this, 'localization_setup' ] );
    }

    /**
     * Instantiate the required classes.
     */
    public function init_classes(): void {
        $this->container['api']    = new API\\Api();
        $this->container['assets'] = new Assets();
    }

    /**
     * Initialize plugin for localization.
     */
    public function localization_setup(): void {
        load_plugin_textdomain( '${data.textDomain}', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * What type of request is this?
     */
    private function is_request( string $type ): bool {
        return match ( $type ) {
            'admin'    => is_admin(),
            'ajax'     => defined( 'DOING_AJAX' ),
            'rest'     => defined( 'REST_REQUEST' ),
            'cron'     => defined( 'DOING_CRON' ),
            'frontend' => ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' ),
            default    => false,
        };
    }

} // ${data.mainClassName}

/**
 * Initialize the main plugin.
 */
function ${data.mainClassName.toLowerCase()}(): ${data.mainClassName} {
    return ${data.mainClassName}::init();
}

// Kick-off the plugin.
${data.mainClassName.toLowerCase()}();
`;

  return code;
};
