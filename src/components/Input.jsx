import './Input.css';

function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Input;
