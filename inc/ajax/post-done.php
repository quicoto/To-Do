<?php

if  ( ! function_exists( 'todo_post_done_callback' ) ):

	function todo_post_done_callback()
	{
		// Check the nonce - security
		check_ajax_referer( 'todo-main-nonce', 'nonce' );

		global $wpdb;

		// Update the meta value
		update_post_meta(intval($_POST['post_id']), 'todo__done', true);

		die(json_encode(new stdClass()));
	}

	add_action( 'wp_ajax_todo_post_done', 'todo_post_done_callback' );
	add_action('wp_ajax_nopriv_todo_post_done', 'todo_post_done_callback');

endif;
