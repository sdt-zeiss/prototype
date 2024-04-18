export default function TitleBar({ title }) {
  return (
    <div className="flex h-24 w-full items-center justify-between bg-gray-800 px-3 py-2">
      <span className="mx-3 text-xl font-bold text-white">{title}</span>
    </div>
  );
}
