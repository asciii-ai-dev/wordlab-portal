import { toast } from 'react-hot-toast';

export const showToast =  (type, message) => {
  const loadingId = toast.loading('Loading...');
  try {
    switch (type) {
      case 'success':
        toast.success(message, {id:loadingId});
        break;
      case 'error':
        toast.error(message, {id:loadingId});
        break;
      case 'warning':
        toast.warning(message, {id:loadingId});
        break;
      default:
        toast(message, {id:loadingId});
    }
  } catch (error) {
    console.log('Error:', error);
  } finally {
    if (loadingId) {
      toast.dismiss(loadingId);
    }
  }
};
