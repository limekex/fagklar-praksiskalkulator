<?php
/**
 * Plugin Name: Fagklar Praksiskalkulator
 * Description: Anonym og veiledende beregning av praksistid for praksiskandidater i kokkfaget. Ingen godkjenning eller innsending.
 * Version: 0.1.0
 * Requires at least: 6.2
 * Requires PHP: 8.0
 * Author: Fagklar
 * Text Domain: fagklar-praksiskalkulator
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once __DIR__ . '/includes/class-fk-praksis-plugin.php';
FK_Praksis_Plugin::init( __FILE__ );
