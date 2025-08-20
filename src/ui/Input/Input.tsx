import './style.scss';

interface InputProps {
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  id: string;
}

export const Input = ({ label, placeholder, onChange, name, value, id }: InputProps) => {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        id={id}
      />
    </div>
  );
};
