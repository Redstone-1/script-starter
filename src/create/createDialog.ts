import { applyCallBack } from '@utils/applyCallBack';

export interface DialogProps {
  title?: string,
  body: HTMLElement | string,
  footer?: HTMLElement | string,
  maskTransparent?: boolean,
  okText?: string,
  cancelText?: string,
  onOk?: (...args: unknown[]) => void,
  onCancel?: (...args: unknown[]) => void,
  onMount?: (...args: unknown[]) => void,
  onDestroy?: (...args: unknown[]) => void,
  hideOk?: boolean,
  hideCancel?: boolean,
  className?: string,
  bodyClassName?: string,
  style?: string,
  bodyStyle?: string,
}

export const createDialog = ({
  title = '',
  body,
  footer,
  maskTransparent = false,
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel,
  hideOk = false,
  hideCancel = false,
  className = '',
  bodyClassName = '',
  style = '',
  bodyStyle = '',
  onMount = () => {},
  onDestroy = () => {},
}: DialogProps) => {
  let storeDialogWidth = 0;
  let storeDialogHeight = 0;
  let isDialogFullScreen: undefined | boolean = undefined;

  const existDialogNodes = document.querySelectorAll('.global-dialog');
  const length = existDialogNodes.length;
  const zIndex = 9999 + length;

  const maskNode = document.createElement('div');

  if (maskTransparent) {
    maskNode.classList.add('global-dialog-mask-transparent');
  }

  const dialogNode = document.createElement('div');
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  const dialogBody = document.createElement('div');
  const headerBtn = document.createElement('div');
  headerBtn.style.display = 'inline-block';
  const headerTitle = document.createElement('div');
  const titleNode = document.createElement('div');
  headerTitle.classList.add('flex-center');
  headerTitle.style.width = 'calc(100% - 64px)';
  headerTitle.appendChild(titleNode);
  titleNode.style.transform = 'translateX(-32px)';
  titleNode.innerText = title;

  const closeBtn = document.createElement('span');
  closeBtn.title = '关闭弹窗';
  const exitFullScreenBtn = document.createElement('span');
  exitFullScreenBtn.title = '退出全屏';
  const fullScreenBtn = document.createElement('span');
  fullScreenBtn.title = '全屏显示';

  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="8" fill="#ff5953"/>
    <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`;
  const exitFullScreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="8" fill="#fabe33"/>
    <rect x="5" y="7" width="6" height="2" fill="white"/>
  </svg>`;
  const fullScreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="8" fill="#53c32b"/>
    <rect x="5" y="5" width="6" height="6" stroke="white" stroke-width="1.2" fill="none"/>
  </svg>`;

  closeBtn.innerHTML = closeIcon;
  closeBtn.classList.add('control-btn');
  closeBtn.classList.add('close-btn');
  exitFullScreenBtn.innerHTML = exitFullScreenIcon;
  exitFullScreenBtn.classList.add('control-btn');
  exitFullScreenBtn.classList.add('exit-full-screen-btn');
  fullScreenBtn.innerHTML = fullScreenIcon;
  fullScreenBtn.classList.add('control-btn');
  fullScreenBtn.classList.add('full-screen-btn');

  // 创建一个新的 ResizeObserver 实例
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (!isDialogFullScreen) {
        storeDialogWidth = entry.contentRect.width;
        storeDialogHeight = entry.contentRect.height;
      } else {
        dialogBody.style.width = '100%';

        if (dialogBody?.firstChild) {
          const firstChild = dialogBody.firstChild as HTMLElement;
          // @ts-expect-error
          firstChild.style = firstChild.style ?? '';
          firstChild.style.width = '100%';
          firstChild.style.height = '100%';
        }
      }
    }
  });

  // 开始监听元素尺寸变化
  resizeObserver.observe(dialogNode);

  const closeDialog = () => {
    const animation = dialogNode.animate([
      { opacity: 1, top: '50%' },
      { opacity: 0, top: '46%' },
    ], {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      animation.cancel();
      document.body.removeChild(maskNode);

      const dialogs = document.querySelectorAll('.global-dialog');
      if (dialogs.length === 0) {
        document.body.style.overflow = 'auto';
      }
      isDialogFullScreen = false;
      resizeObserver.disconnect();

      onDestroy();
    };
  };

  closeBtn.addEventListener('click', () => {
    closeDialog();
  });
  exitFullScreenBtn.addEventListener('click', () => {
    if (isDialogFullScreen) {
      isDialogFullScreen = false;
      dialogNode.style.width = `${Math.ceil(storeDialogWidth)}px`;
      dialogNode.style.height = `${Math.ceil(storeDialogHeight)}px`;
    }
  });
  fullScreenBtn.addEventListener('click', () => {
    if (!isDialogFullScreen) {
      isDialogFullScreen = true;
      dialogNode.style.width = '100%';
      dialogNode.style.height = '100%';
      dialogBody.style.width = '100%';
      dialogBody.style.height = '100%';
    }
  });

  headerBtn.appendChild(closeBtn);
  headerBtn.appendChild(exitFullScreenBtn);
  headerBtn.appendChild(fullScreenBtn);

  header.appendChild(headerBtn);
  header.appendChild(headerTitle);
  header.classList.add('global-dialog-header');
  dialogBody.classList.add('global-dialog-body');
  const footerInner = document.createElement('div');

  maskNode.classList.add('global-dialog-mask');
  dialogNode.classList.add('global-dialog');

  if (className) {
    dialogNode.classList.add(className);
  }
  if (style) {
    // @ts-expect-error
    dialogNode.style = style;
  }

  if (bodyClassName) {
    dialogBody.classList.add(bodyClassName);
  }
  if (bodyStyle) {
    // @ts-expect-error
    dialogBody.style = bodyStyle;
  }

  if (typeof footer === 'string') {
    footerInner.innerHTML = footer;
  }
  else if (footer) {
    footerInner.appendChild(footer);
  }
  else if (footer !== false && footer !== null) {
    footerInner.classList.add('global-dialog-footer');

    if (!hideOk) {
      const footerSaveBtn = document.createElement('div');
      footerSaveBtn.classList.add('custom-button');
      footerSaveBtn.innerText = okText;
      footerSaveBtn.addEventListener('click', () => {
        applyCallBack(onOk, closeDialog);
      });

      footerInner.appendChild(footerSaveBtn);
    }

    if (!hideCancel) {
      const footerCancelBtn = document.createElement('div');
      footerCancelBtn.classList.add('custom-button');
      footerCancelBtn.classList.add('plain-button');
      footerCancelBtn.innerText = cancelText;
      footerCancelBtn.addEventListener('click', async () => {
        const res = await applyCallBack(onCancel) ?? true;
        if (res) {
          closeDialog();
        }
      });

      footerInner.appendChild(footerCancelBtn);
    }
  }

  if (typeof body === 'string') {
    dialogBody.innerHTML = body;
  } else {
    dialogBody.appendChild(body);
  }

  dialogNode.appendChild(header);
  dialogNode.appendChild(dialogBody);
  dialogNode.appendChild(footerInner);

  maskNode.style.zIndex = `${zIndex}`;
  maskNode.appendChild(dialogNode); // 先将 dialogNode 添加到 maskNode 中
  document.body.appendChild(maskNode); // 再将 maskNode 添加到 body 中
  document.body.style.overflow = 'hidden';

  onMount();
};
