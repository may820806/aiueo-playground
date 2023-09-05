import { Toast } from 'primereact/toast';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { isShowToastAtom, toastMessageAtom } from '../infrastructure/atom';

const CustomToastAlert: React.FC = () => {
  const toast = useRef(null) as MutableRefObject<Toast | null>;
  const isShow = useRecoilValue(isShowToastAtom);
  const toastMessage = useRecoilValue(toastMessageAtom);

  useEffect(() => {
    if(toast.current) {
      if(isShow) {
        toast.current.show(toastMessage);
      } else {
        toast.current.clear();
      }
    }
  }, [isShow, toastMessage]);

  return (
    <Toast ref={toast} />
  );
};

export default CustomToastAlert;