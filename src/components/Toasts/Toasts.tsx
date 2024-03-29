import { Toast as ToastType } from '../../contexts/ToastContext';

import { Toast } from './Toast';

import './Toasts.css';

export const Toasts = ({ toasts }: { toasts: ToastType[] }) => (
  <div className='pop-ups-containers'>
    {toasts.map(toast => (
      <Toast {...toast} key={toast.key} />
    ))}
  </div>
);
