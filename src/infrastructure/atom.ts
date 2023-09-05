import { ToastMessage } from 'primereact/toast';
import { atom } from 'recoil';

export const isShowToastAtom = atom({
  key: 'isShowToastAtom',
  default: false
});

export const toastMessageAtom = atom<ToastMessage>({
  key: 'toastMessageAtom',
  default: {
    severity: 'info',
    summary: '',
    detail: '',
    sticky: true,
    life: 2000
  }
});