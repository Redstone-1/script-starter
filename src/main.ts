import { addStyle } from '@utils/addStyle';
import style from '../style';

try {
  // 只有样式添加了，create 文件夹里的组件才能正确显示
  addStyle(style);
} catch (error) {
  console.error(error);
}
