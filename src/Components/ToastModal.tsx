import type { Toast } from "../types";

const ToastModal = ({ message, type }: Toast) => {
  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white
        ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      {message}
    </div>
  );
};

export default ToastModal;
