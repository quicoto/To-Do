/* global todo_main_ajax */

import * as templates from './templates';
import { CLASSES, SELECTORS, DATA_ATTRIBUTES } from './config';

// eslint-disable-next-line func-names
(function () {
  const _ = {
    counterTodo: 0,
    counterTotal: 0,
  };
  const _$ = {};

  function _prependPost(post) {
    const html = templates.post(post, _$.loading);
    _$.postsContainer.innerHTML = `${html}${_$.postsContainer.innerHTML}`;
  }

  function _setElements() {
    _$.loading = document.querySelector(SELECTORS.loading);
    _$.newPostForm = document.querySelector(SELECTORS.newPostForm);
    _$.newPostSubmitButton = document.querySelector(
      SELECTORS.newPostSubmitButton,
    );
    _$.postsContainer = document.querySelector(SELECTORS.postsContainer);
    _$.refreshListButton = document.querySelector(SELECTORS.refreshListButton);
    _$.counter = document.querySelector(SELECTORS.counter);
  }

  function _redirectIfNotLoggedIn(data) {
    if (data.logged_out) {
      const $homeUrlLink = document.querySelector(SELECTORS.homeUrlLink);

      if ($homeUrlLink) {
        window.location = $homeUrlLink.getAttribute('href');
      }
    }
  }

  /**
   * @param  {number} count
   */
  function _updateCounter() {
    _$.counter.innerHTML = templates.counter(_.counterTodo, _.counterTotal);
  }

  function _onSubmit(event) {
    const data = new FormData();

    event.preventDefault();
    _$.newPostSubmitButton.setAttribute('disabled', true);
    _$.loading.removeAttribute('hidden');

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
        _redirectIfNotLoggedIn(post);
        _.counterTodo += 1;
        _.counterTotal += 1;
        _updateCounter();
        _prependPost(post);
        _$.loading.setAttribute('hidden', true);
        _$.newPostForm.reset();
        _$.newPostSubmitButton.removeAttribute('disabled');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('[To Do - Create Post]', error);
        _redirectIfNotLoggedIn({ logged_out: true });
      });

    return false;
  }

  function _onClick(event) {
    event.preventDefault();

    if (!event.target.classList.contains(CLASSES.buttonDone)) return false;

    event.target.setAttribute('disabled', true);

    const postId = +event.target.dataset[DATA_ATTRIBUTES.postID];
    const $post = document.querySelector(
      `[data-${DATA_ATTRIBUTES.postID}="${postId}"]`,
    );
    const data = new FormData();
    data.append('action', 'todo_post_done');
    data.append('nonce', todo_main_ajax.nonce);
    data.append('post_id', postId);

    $post.classList.add(CLASSES.working);

    fetch(todo_main_ajax.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
    })
      .then((response) => response.json())
      .then((error) => {
        _redirectIfNotLoggedIn(error);

        if ($post) {
          $post.classList.remove(CLASSES.working);
          $post.classList.remove(CLASSES.postDefaultBackground);
          $post.classList.add(CLASSES.postDoneBackground);
        }

        _.counterTodo -= 1;
        _updateCounter();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('[To Do - Post Done]', error);
        _redirectIfNotLoggedIn({ logged_out: true });
      });

    return true;
  }

  function _renderPosts() {
    let postsHTML = '';
    const data = new FormData();

    _.counterTodo = 0;
    _$.loading.removeAttribute('hidden');

    data.append('action', 'todo_all_posts');
    data.append('nonce', todo_main_ajax.nonce);

    fetch(todo_main_ajax.ajax_url, {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
    })
      .then((response) => response.json())
      .then((posts) => {
        _redirectIfNotLoggedIn(posts);

        posts.forEach((post) => {
          postsHTML += templates.post(post, _$.loading);
          if (!post.todo__done) {
            _.counterTodo += 1;
          }
        });

        _.counterTotal = posts.length;
        _updateCounter();
        _$.postsContainer.innerHTML = postsHTML;
        _$.loading.setAttribute('hidden', true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('[To Do - All Posts]', error);
        _redirectIfNotLoggedIn({ logged_out: true });
      });
  }

  function _addEventListeners() {
    if (_$.newPostForm) {
      _$.newPostForm.addEventListener('submit', _onSubmit);
    }

    if (_$.postsContainer) {
      _$.postsContainer.addEventListener('click', _onClick);
    }

    if (_$.refreshListButton) {
      _$.refreshListButton.addEventListener('click', _renderPosts);
    }
  }

  function _init() {
    _setElements();

    if (_$.newPostForm) {
      _addEventListeners();
      _renderPosts();
    }
  }

  _init();
}());
