<?php

if  ( ! function_exists( 'todo_all_posts_callback' ) ):

	function todo_all_posts_callback()
	{

		// Check the nonce - security
		check_ajax_referer( 'todo-main-nonce', 'nonce' );

		global $wpdb;

    $args = array(
			'numberposts' => -1,
			'suppress_filters' => false
		);
		$posts = get_posts($args);

		if ($posts) {
			foreach ($posts as &$post) {
				$done = false;

				$post->post_content = make_clickable($post->post_content);

				if(get_post_meta($post->ID, 'todo__done', true)) {
					$done = true;
				}

				$post->todo__done = $done;
			}
		}

		die(json_encode($posts));
	}

	add_action( 'wp_ajax_todo_all_posts', 'todo_all_posts_callback' );
	add_action('wp_ajax_nopriv_todo_all_posts', 'todo_all_posts_callback');

endif;
