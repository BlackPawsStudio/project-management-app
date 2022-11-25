interface InputProps {
  placeholder?: string;
  onChange?: (str: string) => void;
  size: string;
  type?: string
}

const Input = ({ placeholder, onChange, size, type }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      type={type || 'text'}
      className={`${size} rounded-lg bg-inputBackground px-2.5 pr-14 shadow-xxlInner focus:outline-none`}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

export default Input;
