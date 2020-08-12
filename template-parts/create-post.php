
<form class="todo__newPostForm mb-4">
  <div class="row">
    <div class="col-12 mb-3">
      <h3>New item</h3>
      <?php
        $settings = array(
          'media_buttons' => false,
          'quicktags' => false,
          'textarea_rows' => 5
        );
        wp_editor( '', 'todo_new_post_editor', $settings );
      ?>
    </div>
    <div class="col-12 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-9">
      <button type="submit" class="btn btn-primary btn-block todo__newPostSubmitButton">Post</button>
    </div>
  </div>
</form>