export const Checkbox = ({ label, indices, value, onChange }) => {
  return (
    <label className="space-x-2">
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(indices, label)}
      />
      <span>{label}</span>
    </label>
  );
};
