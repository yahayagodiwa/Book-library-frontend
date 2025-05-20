

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-[100vw] inset-0 z-50 bg-black/50 flex items-center justify-center ">
      <div className="relative bg-[#f2f2f2] p-6 rounded-2xl shadow-xl  max-w-md w-[100vw] h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
