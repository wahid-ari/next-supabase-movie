export default function TextArea({ label, className, id, name, placeholder, value, onChange, height, ...rest }) {
  return (
    <div className="mb-4">
      {label &&
        <label htmlFor={name} className="block font-medium text-sm text-neutral-800 dark:text-gray-200">
          {label}
        </label>
      }
      <textarea
        {...rest}
        id={id}
        name={name}
        rows={height}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className ? className + " " : ""}
          text-sm rounded-md mt-2 w-full transition-all p-3
          dark:text-white bg-white dark:bg-neutral-900 
          border border-gray-300 dark:border-neutral-700
          focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none
        `}
      />
    </div>
  )
}

TextArea.disabled = ({ label, className, id, name, placeholder, value, onChange, height, ...rest }) => {
  return (
    <div className="mb-4">
      {label &&
        <label htmlFor={name} className="block font-medium text-sm text-neutral-800 dark:text-gray-200">
          {label}
        </label>
      }
      <textarea
        {...rest}
        id={id}
        name={name}
        rows={height}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled
        className={`${className ? className + " " : ""}
          text-sm rounded-md mt-2 w-full p-3 cursor-not-allowed
          text-neutral-500 bg-gray-100 dark:bg-neutral-800
          border border-gray-300 dark:border-neutral-700
        `}
      />
    </div>
  )
}
