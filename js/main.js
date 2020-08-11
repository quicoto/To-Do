(function () {
  const MODULE_NAME = "todo"
  const _$ = {}
  const CLASSES = {
    newPostContent: `${MODULE_NAME}__newPostContent`,
    newPostForm: `${MODULE_NAME}__newPostForm`,
    postsContainer: `${MODULE_NAME}__postsContainer`
  }
  const SELECTORS = {
    newPostContent: `.${CLASSES.newPostContent}`,
    newPostForm: `.${CLASSES.newPostForm}`,
    postsContainer: `.${CLASSES.postsContainer}`,
  }

  /**************************************************/

  function _templatePostTitle(text) {
    return `<h3>${text}</h3>`;
  }

  function _templatePostContent(text) {
    return `<div>${text}</div>`;
  }

  function _templatePostMeta(text) {
    return `<div>${text}</div>`;
  }

  /**
   * @param  {object} post
   * @property  {string} post.title
   */
  function _templatePost(post) {
    let html = '';

    html += `
    <article class="bg-light p-5 mb-3">
      ${_templatePostTitle(post.title)}
      ${_templatePostMeta(post.meta)}
      ${_templatePostContent(post.content)}
    </article>
`;

    return html
  }

  /**************************************************/

  function _setElements() {
    _$.newPostForm = document.querySelector(SELECTORS.newPostForm)
    _$.postsContainer = document.querySelector(SELECTORS.postsContainer)
  }

  function _onSubmit(event) {
    event.preventDefault()

    _$.newPostContent = document.querySelector(SELECTORS.newPostContent)
    const data = {
			action: 'todo_create_post',
			post_content: _$.newPostContent.value,
			nonce: todo_main_ajax.nonce
		};
		jQuery.post(todo_main_ajax.ajax_url, data, (response) => {
      _$.newPostContent.value = "";
			console.log(response);
		});

    return false
  }

  function _addEventListeners() {
    if (_$.newPostForm) {
      _$.newPostForm.addEventListener('submit', _onSubmit)
    }
  }

  function _renderPosts() {
    let postsHTML = '';
    const data = {
			action: 'todo_all_posts',
			nonce: todo_main_ajax.nonce
		};
    jQuery.get(todo_main_ajax.ajax_url, data, (response) => {
			JSON.parse(response).forEach((post) => {
        postsHTML +=
          _templatePost({
            title: post.post_title,
            content: post.post_content,
            meta: post.post_date
          })
      })

      _$.postsContainer.innerHTML = postsHTML;
    });
  }

  function _init() {
    _setElements()
    _addEventListeners()
    _renderPosts()
  }

  _init();
}());
