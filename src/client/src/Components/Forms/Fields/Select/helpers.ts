import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export type SelectProps = {
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  props: {
    multiple?: boolean;
    fetchFn?: (props: any) => any;
  };
  validations: {
    required?: boolean;
  };
  label: string;
  name: string;
};

export const handleMenuClose = (id: string) => {
  const menuEl = document.querySelector(`#${id} .menu`);
  const clonedMenuEl = menuEl?.cloneNode(true) as Element;
  if (!clonedMenuEl) return;

  const containerEl = menuEl?.parentElement;
  clonedMenuEl.classList.add('menu--close');
  clonedMenuEl.addEventListener('animationend', () => {
    containerEl?.removeChild(clonedMenuEl);
  });

  containerEl?.appendChild(clonedMenuEl);
};
