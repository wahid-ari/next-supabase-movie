export default function TextArea({
  label,
  className,
  id,
  name,
  placeholder,
  value,
  onChange,
  height,
  ...rest
}) {
  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium text-neutral-800 dark:text-gray-200'
        >
          {label}
        </label>
      )}
      <textarea
        {...rest}
        id={id}
        name={name}
        rows={height}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className ? className + ' ' : ''}
          mt-2 w-full rounded-md border border-gray-300 bg-white
          p-3 text-sm outline-none 
          transition-all focus:border-emerald-500 focus:ring-1
          focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white
        `}
      />
    </div>
  );
}

TextArea.disabled = ({
  label,
  className,
  id,
  name,
  placeholder,
  value,
  onChange,
  height,
  ...rest
}) => {
  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium text-neutral-800 dark:text-gray-200'
        >
          {label}
        </label>
      )}
      <textarea
        {...rest}
        id={id}
        name={name}
        rows={height}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled
        className={`${className ? className + ' ' : ''}
          mt-2 w-full cursor-not-allowed rounded-md border border-gray-300
          bg-gray-100 p-3 text-sm
          text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800
        `}
      />
    </div>
  );
};
