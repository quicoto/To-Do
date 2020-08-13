<?php

if  ( ! function_exists( 'todo_create_post_callback' ) ):

	function todo_create_post_callback()
	{

		// Check the nonce - security
		check_ajax_referer( 'todo-main-nonce', 'nonce' );

		global $wpdb;

		// Create post object
		$post = array(
			'post_content'  => sanitize_textarea_field($_POST['post_content']),
			'post_status'   => 'publish',
			'post_author'   => 1
		);

		// Insert the post into the database
		$new_post_id = wp_insert_post( $post );

		update_post_meta(intval($new_post_id), 'todo__done', false);

		// Get the post so we can append it to the list
		$new_post = get_post($new_post_id);
		$new_post->post_content = make_clickable($new_post->post_content);

		die(json_encode($new_post));
	}

	add_action( 'wp_ajax_todo_create_post', 'todo_create_post_callback' );
	add_action('wp_ajax_nopriv_todo_create_post', 'todo_create_post_callback');

endif;
