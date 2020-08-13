const MODULE_NAME = 'todo';

export const DATA_ATTRIBUTES = {
  postID: 'postid',
};

export const CLASSES = {
  buttonDone: `${MODULE_NAME}__buttonDone`,
  counter: `${MODULE_NAME}__counter`,
  loading: `${MODULE_NAME}__loading`,
  newPostContent: `${MODULE_NAME}__newPostContent`,
  newPostForm: `${MODULE_NAME}__newPostForm`,
  newPostSubmitButton: `${MODULE_NAME}__newPostSubmitButton`,
  postDefaultBackground: 'bg-light',
  postDoneBackground: `${MODULE_NAME}__post--done`,
  postsContainer: `${MODULE_NAME}__postsContainer`,
  refreshListButton: `${MODULE_NAME}__refreshListButton`,
  working: `${MODULE_NAME}__post--working`,
};

export const SELECTORS = {
  counter: `.${CLASSES.counter}`,
  loading: `.${CLASSES.loading}`,
  newPostContent: `.${CLASSES.newPostContent}`,
  newPostForm: `.${CLASSES.newPostForm}`,
  newPostSubmitButton: `.${CLASSES.newPostSubmitButton}`,
  postsContainer: `.${CLASSES.postsContainer}`,
  refreshListButton: `.${CLASSES.refreshListButton}`,
  homeUrlLink: '.site-title a',
};
