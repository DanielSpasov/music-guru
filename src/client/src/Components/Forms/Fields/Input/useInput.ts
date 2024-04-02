import { useCallback, useMemo, useState } from 'react';
import { UseInputProps, UseInputReturnType } from './helpers';

export function useInput({
  type = 'text',
  name,
  setValue,
  validateField,
  onChange
}: UseInputProps): UseInputReturnType {
  const [passVisibility, setPassVisibility] = useState(false);

  const id = useMemo(() => `${name}-input`, [name]);

  const iconModel = useMemo(() => {
    switch (type) {
      case 'file':
        return 'upload';
      case 'password':
        return passVisibility ? 'show' : 'hide';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  }, [type, passVisibility]);

  const _onIconClick = useCallback(() => {
    switch (type) {
      case 'file':
        document.getElementById(id)?.click();
        return;
      case 'password':
        setPassVisibility(prev => !prev);
        return;
      default:
        document.getElementById(id)?.focus();
        return;
    }
  }, [id, type]);

  const _onChange = useCallback(
    (e: InputEvent) => {
      if (type === 'file') {
        const input = e.target as HTMLInputElement;
        setValue(name, input.files?.[0]);
        validateField(name, input.files?.[0]);
        return;
      }
      onChange(e);
    },
    [onChange, type, name, setValue, validateField]
  );

  const _onClear = useCallback(() => {
    const input = document.getElementById(id) as HTMLInputElement;
    input.files = null;
    input.value = '';
    onChange('');
  }, [onChange, id]);

  return {
    id,
    iconModel,
    inputType: passVisibility ? 'text' : type,
    _onIconClick,
    _onChange,
    _onClear
  };
}
