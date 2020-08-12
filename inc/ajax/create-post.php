<?php

/*-----------------------------------------------------------------------------------*/
/* Handle the Ajax request to create post */
/*-----------------------------------------------------------------------------------*/
if  ( ! function_exists( 'todo_create_post_callback' ) ):

	function todo_create_post_callback()
	{

		// Check the nonce - security
		check_ajax_referer( 'todo-main-nonce', 'nonce' );

		global $wpdb;

		// Create post object
		$post = array(
			// 'post_title'    => wp_strip_all_tags( 'New post' ),
			'post_content'  => sanitize_textarea_field($_POST['post_content']),
			'post_status'   => 'publish',
			'post_author'   => 1
		);

		// Insert the post into the database
		wp_insert_post( $post );

		die(json_encode(new stdClass()));
	}

	add_action( 'wp_ajax_todo_create_post', 'todo_create_post_callback' );
	add_action('wp_ajax_nopriv_todo_create_post', 'todo_create_post_callback');

endif;