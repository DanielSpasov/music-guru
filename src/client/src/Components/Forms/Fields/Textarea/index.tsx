import { useRef } from 'react';

import { FieldProps } from '../helpers';
import Controls from '../Controls';

const hoverProps = 'hover:border-neutral-300';
const focusProps =
  'focus:border-primary [&~label]:focus:-top-7 [&~label]:focus:left-1';
const darkProps =
  'dark:bg-neutral-800 dark:border-neutral-600 dark:hover:border-neutral-500 dark:focus:border-primary-dark';

export default function Textarea({
  label,
  value,
  onChange
}: FieldProps<string, never>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="relative my-2">
      <textarea
        value={value}
        ref={textareaRef}
        onChange={onChange}
        className={`w-full min-h-[80px] border-2 p-2 pr-16 bg-neutral-100 transition-colors border-neutral-200 outline-none rounded-md resize-y ${hoverProps} ${focusProps} ${darkProps}`}
      >
        {value}
      </textarea>

      <label
        className={`absolute ${!value ? 'top-2.5 left-3' : '-top-7 left-1'}`}
      >
        {label}
      </label>

      <Controls
        value={value}
        iconModel="textarea"
        onClear={() => onChange('')}
        onClick={() => textareaRef.current?.focus()}
      />
    </div>
  );
}
