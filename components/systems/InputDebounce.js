import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function InputDebounce({
  id,
  name,
  label,
  placeholder,
  value: initialValue,
  onChange,
  type,
  className,
  wrapperClassName,
  debounce = 300,
  ...props }) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <label className='block text-sm text-gray-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={clsx(className,
          'text-sm mt-2 w-full rounded-md border border-gray-300',
          'bg-white px-4 py-[0.6rem] font-medium outline-none ring-gray-300 transition-all',
          'focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-neutral-700',
          'dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-600 dark:focus:border-sky-500',
          'dark:focus:ring-sky-500'
        )}
        autoComplete='off'
        required
      />
    </div>
  )
}