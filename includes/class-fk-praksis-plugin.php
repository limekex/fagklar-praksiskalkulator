<?php
/**
 * Minimal WordPress adapter for the browser-only calculator.
 * No REST endpoints, persistence, cookies, AJAX, or user data collection.
 */
final class FK_Praksis_Plugin {
    private static string $plugin_file;
    private static bool $assets_registered = false;
    private static bool $config_injected = false;

    public static function init( string $plugin_file ): void {
        self::$plugin_file = $plugin_file;
        add_action( 'init', array( __CLASS__, 'register_shortcode' ) );
        add_action( 'wp_enqueue_scripts', array( __CLASS__, 'maybe_enqueue_early' ) );
    }

    public static function register_shortcode(): void {
        add_shortcode( 'fagklar_praksiskalkulator', array( __CLASS__, 'render_shortcode' ) );
    }

    public static function maybe_enqueue_early(): void {
        $post = get_post();
        if ( $post && has_shortcode( (string) $post->post_content, 'fagklar_praksiskalkulator' ) ) {
            self::enqueue_assets();
        }
    }

    private static function read_json( string $name ): array {
        $path = dirname( self::$plugin_file ) . '/data/' . $name;
        if ( ! is_readable( $path ) ) {
            return array();
        }
        $content = file_get_contents( $path );
        if ( false === $content ) {
            return array();
        }
        $decoded = json_decode( $content, true );
        return is_array( $decoded ) ? $decoded : array();
    }

    public static function enqueue_assets(): void {
        $base = plugin_dir_url( self::$plugin_file );
        $path = dirname( self::$plugin_file );
        if ( ! self::$assets_registered ) {
            wp_register_style(
                'fk-praksis-styles',
                $base . 'assets/css/app.css',
                array(),
                (string) filemtime( $path . '/assets/css/app.css' )
            );
            wp_register_script(
                'fk-praksis-engine',
                $base . 'assets/js/engine.js',
                array(),
                (string) filemtime( $path . '/assets/js/engine.js' ),
                true
            );
            wp_register_script(
                'fk-praksis-app',
                $base . 'assets/js/app.js',
                array( 'fk-praksis-engine' ),
                (string) filemtime( $path . '/assets/js/app.js' ),
                true
            );
            self::$assets_registered = true;
        }
        if ( ! self::$config_injected ) {
            $settings = array(
                'registry' => self::read_json( 'counties.json' ),
                'copy'     => self::read_json( 'copy-nb.json' ),
            );
            wp_add_inline_script(
                'fk-praksis-app',
                'window.FKPR_DATA = ' . wp_json_encode( $settings, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . ';',
                'before'
            );
            self::$config_injected = true;
        }
        wp_enqueue_style( 'fk-praksis-styles' );
        wp_enqueue_script( 'fk-praksis-engine' );
        wp_enqueue_script( 'fk-praksis-app' );
    }

    public static function render_shortcode(): string {
        self::enqueue_assets();
        $copy = self::read_json( 'copy-nb.json' );
        if ( empty( $copy['legal']['p1'] ) || empty( $copy['legal']['p2'] ) ) {
            return '<p>Praksiskalkulatoren er midlertidig utilgjengelig. Prøv igjen senere.</p>';
        }
        $heading = $copy['product']['title'];
        $intro = $copy['product']['intro'];
        $legal = $copy['legal'];
        $guide = $copy['links']['udirGuide'];
        $id = function_exists( 'wp_unique_id' ) ? wp_unique_id( 'fk-praksis-' ) : uniqid( 'fk-praksis-', false );
        ob_start();
        ?>
        <section class="fk-praksis" id="<?php echo esc_attr( $id ); ?>" data-fk-praksis aria-label="<?php echo esc_attr( $heading ); ?>">
          <div class="fk-praksis__fallback" data-fk-fallback>
            <h2><?php echo esc_html( $heading ); ?></h2>
            <p><?php echo esc_html( $intro ); ?></p>
            <aside class="fk-praksis__legal" aria-label="<?php echo esc_attr( $legal['title'] ); ?>">
              <h3><?php echo esc_html( $legal['title'] ); ?></h3>
              <p><?php echo esc_html( $legal['p1'] ); ?></p>
              <p><?php echo esc_html( $legal['p2'] ); ?></p>
            </aside>
            <p>Hvis skjemaet ikke vises, kan du lese <a href="<?php echo esc_url( $guide ); ?>">Utdanningsdirektoratets veileder om praksiskandidater</a>.</p>
          </div>
        </section>
        <?php
        return (string) ob_get_clean();
    }
}
