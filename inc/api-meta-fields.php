<?php

// https://developer.wordpress.org/reference/functions/register_rest_field/
// An example to add all of the post meta to a post-meta-fields field:

add_action( 'rest_api_init', 'create_api_posts_meta_field' );

function create_api_posts_meta_field() {
    register_rest_field( 'post', 'done', array(
           'get_callback'    => 'get_post_meta_done',
           'schema'          => null,
        )
    );

    register_rest_field( 'post', 'clean-title', array(
      'get_callback'    => 'get_post_clean_title',
      'schema'          => null,
      )
    );
}

function get_post_meta_done( $object ) {
    //get the id of the post object array
    $post_id = $object['id'];

    // return the post meta
    return get_post_meta( $post_id, 'todo__done', true) === "1" ? true : false;
}

function get_post_clean_title( $object ) {
    //get the id of the post object array
    $post_id = $object['id'];

    return wp_strip_all_tags(get_the_content($post_id));
}