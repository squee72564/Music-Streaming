export const Checkbox = ({label, indices, value, onChange}) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={(event) => onChange(indices, label)}/>
            {label}
        </label>
    );
};