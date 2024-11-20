export const createMessage = (type: 'success' | 'error', message: string, duration = 2000) => {
  const existMessageNode = document.querySelector('.global-message');

  if (existMessageNode) {
    document.body.removeChild(existMessageNode);
  }

  const svgSuccess = `<svg style="color: #19af5d" viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>`;
  const svgError = `<svg style="color: #ff4d4f" fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path></svg>`;

  const svgMap = new Map([
    ['success', svgSuccess],
    ['error', svgError],
  ]);

  const innerHTML = `
    ${svgMap.get(type)}
    <span class="global-message_text">${message}</span>
  `;

  const messageNode = document.createElement('div');
  let timer: null | NodeJS.Timeout = null;

  messageNode.classList.add('global-message');
  messageNode.innerHTML = innerHTML;
  document.body.appendChild(messageNode);

  timer = setTimeout(() => {
    const animation = messageNode.animate([
      { opacity: 1, top: '30px' },
      { opacity: 0, top: '10px' },
    ], {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      animation.cancel();

      if (messageNode) {
        document.body.removeChild(messageNode);
      }

      clearTimeout(timer as NodeJS.Timeout);
    };
  }, duration);
};
