import { useToastStore } from "../store/toastStore";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container-custom">
      {toasts.map((toast) => {
        let iconClass = "bi bi-info-circle-fill";
        if (toast.type === "success") iconClass = "bi bi-check-circle-fill";
        if (toast.type === "danger") iconClass = "bi bi-exclamation-triangle-fill";
        if (toast.type === "warning") iconClass = "bi bi-exclamation-circle-fill";

        return (
          <div 
            key={toast.id} 
            className={`toast-item-custom toast-${toast.type}`}
            role="alert"
          >
            <div className="toast-icon-custom">
              <i className={iconClass}></i>
            </div>
            <div className="toast-message-custom">
              {toast.message}
            </div>
            <button 
              onClick={() => removeToast(toast.id)} 
              className="toast-close-custom"
              aria-label="Đóng"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}
