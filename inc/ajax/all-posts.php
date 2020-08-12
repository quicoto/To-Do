<?php

if  ( ! function_exists( 'todo_all_posts_callback' ) ):

	function todo_all_posts_callback()
	{

		$meta_key = 'todo__done';

		// Check the nonce - security
		check_ajax_referer( 'todo-main-nonce', 'nonce' );

		global $wpdb;

		$posts_done = query_posts(
			array(
						'numberposts' => -1,
						'suppress_filters' => false,
						'post_type' => 'post',
						'order'     => 'DESC',
						'orderby'   => 'date',
						'meta_query' => array(
								array('key' => $meta_key,
											'value' => true,
											'type' => 'BINARY',
											'compare' => '='
								)
						)
			)
		);

		$posts_not_done = query_posts(
			array(
						'numberposts' => 50,
						'suppress_filters' => false,
						'post_type' => 'post',
						'order'     => 'DESC',
						'orderby'   => 'date',
						'meta_query' => array(
								array('key' => $meta_key,
											'value' => false,
											'type' => 'BINARY',
											'compare' => '='
								)
						)
			)
		);

		$posts = array_merge($posts_not_done, $posts_done);

		if ($posts) {
			foreach ($posts as &$post) {
				$done = false;

				$post->post_content = make_clickable($post->post_content);

				if(get_post_meta($post->ID, $meta_key, true)) {
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
