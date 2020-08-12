<?php
/**
 * todo functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package todo
 */

if ( ! function_exists( 'todo_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function todo_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on todo, use a find and replace
		 * to change 'todo' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'todo', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
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
endif;
add_action( 'after_setup_theme', 'todo_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function todo_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'todo_content_width', 640 );
}
add_action( 'after_setup_theme', 'todo_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function todo_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'todo' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'todo' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'todo_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function todo_scripts() {
	$theme_version = "1.0.0";

	/*-----------------------------------------------------------------------------------*/
	/* Encue the Scripts for main CSS */
	/*-----------------------------------------------------------------------------------*/
	wp_enqueue_style( 'todo-style', get_stylesheet_uri(), array(), $theme_version );

	/*-----------------------------------------------------------------------------------*/
	/* Encue the Scripts for the Ajax call */
	/*-----------------------------------------------------------------------------------*/

	wp_enqueue_script('todo-main', get_template_directory_uri() . '/scripts.min.js', array(), $theme_version, true);
	wp_localize_script( 'todo-main', 'todo_main_ajax', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'nonce' => wp_create_nonce( 'todo-main-nonce' ) ) );

	/*-----------------------------------------------------------------------------------*/
	/* Encue the Scripts for Comments */
	/*-----------------------------------------------------------------------------------*/

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'todo_scripts' );

function todo_remove_crap(){
	wp_dequeue_style( 'wp-block-library' );
	wp_deregister_script( 'wp-embed' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
}
add_action( 'wp_enqueue_scripts', 'todo_remove_crap' );

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Ajax
 */
require get_template_directory() . '/inc/ajax/all-posts.php';
require get_template_directory() . '/inc/ajax/create-post.php';
require get_template_directory() . '/inc/ajax/post-done.php';

/**
 * Redirect to FE
 */
require get_template_directory() . '/inc/redirect-after-login.php';