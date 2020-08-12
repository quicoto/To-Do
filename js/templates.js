function _postTitle(text) {
  let html = '';

  if (text) {
    html = `<div class="col-12"><h3>${text}</h3></div>`;
  }

  return html;
}

function _postContent(text) {
  return `<div class="col-12 mb-3">${text}</div>`;
}

function _postMeta(text) {
  return `<div class="col-12"><small>${text}</small></div>`;
}

function _buttonDone() {
  return '<div class="col-12 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-9 text-right"><button type="button" class="btn btn-success btn-block">Mark as done</button></div>';
}

/**
 * @param  {object} data
 * @property  {string} data.title
 * @property  {string} data.post_date
 * @property  {string} data.post_content
 */
export function post(data) {
  let html = '';

  html += `
  <article class="row bg-light p-3 mb-3">
    ${_postTitle(data.post_title)}
    ${_postMeta(data.post_date)}
    ${_postContent(data.post_content)}
    ${_buttonDone()}
  </article>
`;

  return html;
}
