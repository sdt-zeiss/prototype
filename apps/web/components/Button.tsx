export default function Button({ children, onClick }) {

  return (
    <button
      className="h-8 bg-blue-700 hover:bg-blue-700 text-white rounded flex items-center justify-center px-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
