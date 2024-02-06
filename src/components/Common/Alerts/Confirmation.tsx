// ConfirmationModal.tsx
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    // You need to implement your modal JSX structure here
    // Include a message like "Are you sure you want to delete this course?"
    // Add buttons for confirming and canceling the action
    // Use CSS styles or a library like react-modal for styling and handling modal behavior
    <div>
      <div>{/* Modal content here */}</div>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ConfirmationModal;
