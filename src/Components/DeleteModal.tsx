import { forwardRef, useState, useImperativeHandle } from "react";
import type { DeleteModalProps, DeleteModalType } from "../types";

const DeleteModal = forwardRef<DeleteModalType, DeleteModalProps>(
  (props, ref) => {
    const [modalState, setModalState] = useState(false);

    useImperativeHandle(ref, () => ({
      openModal: () => setModalState(true),
    }));

    if (!modalState) return null;

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-4 rounded m-4">
          <p>
            Are you sure about deleting{" "}
            <span className="font-bold">{props.postTitle}</span>?
          </p>
          <div className="flex gap-4">
            <button className="button-style bg-red-400" onClick={props.onConfirm}>yes</button>
            <button className="button-style bg-blue-500" onClick={() => setModalState(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
);

export default DeleteModal;
