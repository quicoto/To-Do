<?php

/*-----------------------------------------------------------------------------------*/
/* Handle the Ajax request to create post */
/*-----------------------------------------------------------------------------------*/
if  ( ! function_exists( 'todo_all_posts_callback' ) ):

	function todo_all_posts_callback()
	{

		// Check the nonce - security
		check_ajax_referer( 'todo-main-nonce', 'nonce' );

		global $wpdb;

		$posts = get_posts();

		die(json_encode($posts));
	}

	add_action( 'wp_ajax_todo_all_posts', 'todo_all_posts_callback' );
	add_action('wp_ajax_nopriv_todo_all_posts', 'todo_all_posts_callback');

endif;
