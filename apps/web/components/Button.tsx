export default function Button({ children, onClick }) {
  return (
    <button
      className="flex h-8 items-center justify-center rounded bg-blue-700 px-3 text-white hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
