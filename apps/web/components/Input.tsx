export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="h-8 border border-gray-400 rounded-md p-2 font-medium text-base "
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
