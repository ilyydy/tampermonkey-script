import { ElMessage } from 'element-plus';

export function success(msg: string) {
  return ElMessage.success({ message: msg, showClose: true, grouping: true });
}

export function warning(msg: string) {
  console.warn(msg);
  return ElMessage.warning({ message: msg, showClose: true, grouping: true });
}

export function error(msg: string) {
  console.error(msg);
  return ElMessage.error({ message: msg, showClose: true, grouping: true });
}

export function info(msg: string) {
  return ElMessage.info({ message: msg, showClose: true, grouping: true });
}
