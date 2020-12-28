<?php

// https://developer.wordpress.org/reference/functions/register_rest_field/
// An example to add all of the post meta to a post-meta-fields field:

add_action( 'rest_api_init', 'create_api_posts_meta_field' );

function create_api_posts_meta_field() {
    register_rest_field( 'post', 'post-meta-fields', array(
           'get_callback'    => 'get_post_meta_for_api',
           'schema'          => null,
        )
    );
}

function get_post_meta_for_api( $object ) {
    //get the id of the post object array
    $post_id = $object['id'];

    // return the post meta
    return array(
      get_post_meta( $post_id ),
      'title' => wp_strip_all_tags(get_the_content($post_id))
    );
}