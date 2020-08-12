/* global todo_main_ajax */

import * as templates from './templates';
import config from './config';

(function () {
  const MODULE_NAME = 'todo';
  const _$ = {};
  const CLASSES = {
    newPostContent: `${MODULE_NAME}__newPostContent`,
    newPostForm: `${MODULE_NAME}__newPostForm`,
    postsContainer: `${MODULE_NAME}__postsContainer`,
  };
  const SELECTORS = {
    newPostContent: `.${CLASSES.newPostContent}`,
    newPostForm: `.${CLASSES.newPostForm}`,
    postsContainer: `.${CLASSES.postsContainer}`,
  };

  function _prependPost(post) {
    const html = templates.post(post);
    _$.postsContainer.innerHTML = `${html}${_$.postsContainer.innerHTML}`;
  }

  function _setElements() {
    _$.newPostForm = document.querySelector(SELECTORS.newPostForm);
    _$.postsContainer = document.querySelector(SELECTORS.postsContainer);
  }

  function _onSubmit(event) {
    const data = new FormData();

    event.preventDefault();

    _$.newPostContent = document.querySelector(SELECTORS.newPostContent);

    data.append('action', 'todo_create_post');
    data.append('nonce', todo_main_ajax.nonce);
    data.append('post_content', _$.newPostContent.value);

    fetch(todo_main_ajax.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
    })
      .then((response) => response.json())
      .then((post) => {
        _prependPost(post);
        _$.newPostContent.value = '';
      })
      .catch((error) => {
        console.log('[To Do - Create Post]');
        console.error(error);
      });

    return false;
  }

  function _addEventListeners() {
    if (_$.newPostForm) {
      _$.newPostForm.addEventListener('submit', _onSubmit);
    }
  }

  function _renderPosts() {
    let postsHTML = '';
    const data = new FormData();

    data.append('action', 'todo_all_posts');
    data.append('nonce', todo_main_ajax.nonce);

    fetch(todo_main_ajax.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
    })
      .then((response) => response.json())
      .then((posts) => {
        posts.slice(0, config.maxPosts).forEach((post) => {
          postsHTML
          += templates.post(post);
        });

        _$.postsContainer.innerHTML = postsHTML;
      })
      .catch((error) => {
        console.log('[To Do - All Posts]');
        console.error(error);
      });
  }

  function _init() {
    _setElements();
    _addEventListeners();
    _renderPosts();
  }

  _init();
}());
