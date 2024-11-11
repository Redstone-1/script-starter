import { MessageTypeEnum } from "@enum/message-type.enum";
import { createMessage } from "../create/createMessage";

export const copyToText = (text: string, messageCallback?: (res: boolean) => void) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  const res = document.execCommand('copy') && document.queryCommandEnabled('copy');
  document.body.removeChild(textarea);

  if (typeof messageCallback === 'function') {
    messageCallback(res);
  } else {
    if (res) {
      createMessage(MessageTypeEnum.SUCCESS, '复制成功！');
    } else {
      createMessage(MessageTypeEnum.ERROR, '复制失败！');
    }
  }
}
