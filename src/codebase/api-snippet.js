export const apiSnippetCode = (data, restapis) => {
    let routes = ``;
    restapis.forEach((api) => {
        if (api.enabled && api.className) {
            routes += `        $this->container['${api.className.toLowerCase()}'] = new ${api.className}();\n`;
        }
    });

    let code = `<?php
/**
 * API Class
 */

declare(strict_types=1);

namespace ${data.baseNamespace}\\API;

/**
 * Class Api
 */
class Api {
    /**
     * Holds various class instances.
     */
    private array $container = [];

    /**
     * Api constructor.
     */
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    /**
     * Register the routes
     */
    public function register_routes(): void {
${routes}
    }
}
`;
    return code;
};
