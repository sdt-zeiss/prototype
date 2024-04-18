export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="h-8 rounded-md border border-gray-400 p-2 text-base font-medium "
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
