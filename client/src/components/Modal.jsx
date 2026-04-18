export default function Modal({
  children,
  isOpen,
  onClose,
  hideHeader = true,
  title = "",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-white w-full max-w-md rounded-lg p-5 border border-slate-200 relative">
        {!hideHeader && <h2>{title}</h2>}

        <div
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-slate-600 hover:text-amber-400 transition-color ease-in duration-75"
        >
          <svg height="10" width="10" viewBox="0 0 10 10">
            <path
              d="M 0 0 L 10 10 M 10 0 L 0 10"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {children}
      </div>
    </div>
  );
}
