export default function TitleBar({ title }) {
  return (
    <div className="flex h-24 w-full px-3 py-2 bg-gray-800 justify-between items-center">
      <span className="text-xl font-bold text-white mx-3">
        {title}
      </span>
    </div>
  );
}
