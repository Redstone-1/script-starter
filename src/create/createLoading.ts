export const createLoading = (style = 'width: 400px; height: 225px;') => {
  // loading
  const loadingNode = document.createElement('div');
  loadingNode.classList.add('global-loading');

  // @ts-expect-error
  loadingNode.style = style;

  return loadingNode;
};
