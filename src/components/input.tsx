import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  helperText?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export function Input({
  id,
  label,
  value,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  helperText,
  prefix,
  suffix,
  icon,
  required = false,
  className = '',
  ...props
}: InputProps) {
  const inputId =
    id ||
    (typeof crypto !== 'undefined' && crypto.randomUUID
      ? `input-${crypto.randomUUID()}`
      : `input-${Math.random().toString(36).slice(2, 11)}`) //id 미지정 시 자동으로 id 생성

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div
        className={`relative flex w-full items-center gap-2 rounded-md border bg-white px-4 py-2 transition-colors placeholder:text-gray-400 ${disabled ? 'cursor-not-allowed bg-gray-100 opacity-60' : ''} ${error ? 'border-red-500' : 'border-gray-300'} ${!error && !disabled ? 'focus-within:border-gray-400' : ''} ${className}`} //상태 우선순위: disabled -> error -> focus
      >
        {prefix && <span className="text-gray-500">{prefix}</span>}
        {icon && (
          <div className="text-custom-gray-400 absolute top-1/2 left-3 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          {...props}
          className={`w-full bg-transparent text-gray-800 outline-none ${icon ? 'cursor-pointer pl-8' : ''}`}
        />

        {suffix && <span className="text-gray-500">{suffix}</span>}
      </div>

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  )
}
