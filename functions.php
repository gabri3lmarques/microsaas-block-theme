<?php
/**
 * Microsaas Theme Functions and Definitions
 *
 * @package Microsaas
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'MICROSAAS_VERSION', '1.0.0' );
define( 'MICROSAAS_DIR', get_template_directory() );
define( 'MICROSAAS_URI', get_template_directory_uri() );

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function microsaas_setup() {
	// Enable block styles support.
	add_theme_support( 'wp-block-styles' );

	// Enable support for responsive embedded content.
	add_theme_support( 'responsive-embeds' );

	// Enable editor styles.
	add_theme_support( 'editor-styles' );

	// Enable post thumbnails.
	add_theme_support( 'post-thumbnails' );

	// Enable HTML5 markup support.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
}
add_action( 'after_setup_theme', 'microsaas_setup' );

/**
 * Register custom block pattern categories for Microsaas.
 */
function microsaas_register_pattern_categories() {
	register_block_pattern_category(
		'microsaas',
		array(
			'label'       => __( 'Microsaas - Componentes', 'microsaas' ),
			'description' => __( 'Componentes e seções de alta conversão para produtos SaaS.', 'microsaas' ),
		)
	);

	register_block_pattern_category(
		'microsaas-pages',
		array(
			'label'       => __( 'Microsaas - Páginas Completas', 'microsaas' ),
			'description' => __( 'Modelos de páginas completas para Micro-SaaS e Startups.', 'microsaas' ),
		)
	);
}
add_action( 'init', 'microsaas_register_pattern_categories' );

/**
 * Register custom Gutenberg blocks built with @wordpress/scripts.
 */
function microsaas_register_custom_blocks() {
	$blocks = array(
		'hero',
		'pricing-table',
		'features-grid',
		'faq-accordion',
	);

	foreach ( $blocks as $block ) {
		$block_dir = MICROSAAS_DIR . '/build/blocks/' . $block;
		if ( file_exists( $block_dir . '/block.json' ) ) {
			register_block_type( $block_dir );
		}
	}
}
add_action( 'init', 'microsaas_register_custom_blocks' );

/**
 * Enqueue theme custom stylesheets or fonts if required.
 */
function microsaas_enqueue_scripts() {
	// Custom base micro-animations and smooth scroll.
	wp_enqueue_style(
		'microsaas-global-styles',
		MICROSAAS_URI . '/assets/css/global.css',
		array(),
		MICROSAAS_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'microsaas_enqueue_scripts' );

/**
 * Register custom block category for Gutenberg editor.
 */
function microsaas_block_categories( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'microsaas',
				'title' => __( 'Microsaas Blocks', 'microsaas' ),
				'icon'  => 'superhero-alt',
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'microsaas_block_categories', 10, 1 );
