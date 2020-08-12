import { DATA_ATTRIBUTES, CLASSES } from './config';

function _postTitle(text) {
  let html = '';

  if (text) {
    html = `<div class="col-12"><h3>${text}</h3></div>`;
  }

  return html;
}

function _postContent(text) {
  return `<div class="col-12 mb-3 todo__postContent">${text}</div>`;
}

function _postMeta(text) {
  return `<div class="col-12"><small>${text}</small></div>`;
}

function _buttonDone(postId) {
  return `
  <div
    class="todo__postActions col-12 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-9 text-right"
    >
    <button
      data-${DATA_ATTRIBUTES.postID}="${postId}"
      type="button"
      class="btn btn-success btn-block todo__buttonDone">
        Mark as done
      </button>
  </div>`;
}

/**
 * @param  {object} data
 * @property  {string} data.title
 * @property  {string} data.post_date
 * @property  {string} data.post_content
 * @param  {HTMLElement} $loading
 * @returns {string}
 */
export function post(data, $loading) {
  let html = '';
  let backgroundClass = CLASSES.postDefaultBackground;

  if (data.todo__done) {
    backgroundClass = CLASSES.postDoneBackground;
  }

  html += `
  <article class="todo__post position-relative row ${backgroundClass} p-3 mb-3" data-${DATA_ATTRIBUTES.postID}="${data.ID}">
    <div class="${CLASSES.loading}">${$loading.innerHTML}</div>
    ${_postTitle(data.post_title)}
    ${_postMeta(data.post_date)}
    ${_postContent(data.post_content)}
    ${_buttonDone(data.ID)}
  </article>
`;

  return html;
}
