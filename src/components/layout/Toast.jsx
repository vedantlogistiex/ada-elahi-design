import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toastMessage } = useApp();

  return (
    <div className={`exec-toast ${toastMessage ? 'show' : ''}`} id="execToast">
      {toastMessage}
    </div>
  );
};
