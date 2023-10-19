export type SelectProps = {
  fetchFn: (props: any) => any;
  multiple?: boolean;
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
