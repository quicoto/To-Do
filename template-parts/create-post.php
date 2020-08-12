
<form class="todo__newPostForm mb-4">
  <div class="row">
    <div class="col-12 mb-3">
      <label for="new-post">New item</label>
      <textarea class="form-control todo__newPostContent" id="new-post" rows="3" required></textarea>
    </div>
  </div>
  <div class="row">
    <div class="order-1 order-sm-2 col-12 col-sm-6 col-md-4 offset-md-4 col-lg-3 offset-lg-6 mb-3">
      <button type="submit" class="btn btn-primary btn-block todo__newPostSubmitButton">Post</button>
    </div>

    <div class="order-2 order-sm-1 col-12 col-sm-6 col-md-4 col-lg-3">
      <button type="button" class="btn btn-outline-primary btn-block todo__refreshListButton">Refresh list</button>
    </div>
  </div>
</form>