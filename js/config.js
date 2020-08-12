const MODULE_NAME = 'todo';

export const VALUES = {
  maxPosts: 50,
};

export const DATA_ATTRIBUTES = {
  postID: 'postid',
};

export const CLASSES = {
  buttonDone: `${MODULE_NAME}__buttonDone`,
  loading: `${MODULE_NAME}__loading`,
  newPostContent: `${MODULE_NAME}__newPostContent`,
  newPostForm: `${MODULE_NAME}__newPostForm`,
  newPostSubmitButton: `${MODULE_NAME}__newPostSubmitButton`,
  postDefaultBackground: 'bg-light',
  postDoneBackground: `${MODULE_NAME}__post--done`,
  working: `${MODULE_NAME}__post--working`,
  postsContainer: `${MODULE_NAME}__postsContainer`,
};

export const SELECTORS = {
  loading: `.${CLASSES.loading}`,
  newPostContent: `.${CLASSES.newPostContent}`,
  newPostForm: `.${CLASSES.newPostForm}`,
  newPostSubmitButton: `.${CLASSES.newPostSubmitButton}`,
  postsContainer: `.${CLASSES.postsContainer}`,
};
