import { useApp } from '../context/AppContext';
import { TOAST_TYPES } from '../utils/constants';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const Toast = () => {
  const { toasts, removeToast } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case TOAST_TYPES.ERROR:
        return <XCircle className="w-5 h-5 text-red-500" />;
      case TOAST_TYPES.WARNING:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case TOAST_TYPES.INFO:
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-500/10 border-green-500/20';
      case TOAST_TYPES.ERROR:
        return 'bg-red-500/10 border-red-500/20';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-500/10 border-yellow-500/20';
      case TOAST_TYPES.INFO:
      default:
        return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-lg animate-slide-in ${getBackgroundColor(
            toast.type
          )}`}
        >
          {getIcon(toast.type)}
          <p className="text-sm font-medium text-white">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
