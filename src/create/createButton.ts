export const createButton = (
  text: string,
  insertFn: (button: HTMLDivElement) => void,
  clickFn: (e: MouseEvent, button: HTMLDivElement) => void
) => {
  const button = document.createElement('div');
  button.classList.add('custom-button');
  button.innerText = text;
  button.addEventListener('click', (e) => clickFn(e, button));
  insertFn(button);
  return button;
};