import { ReactNode, useState } from 'react';
import styles from './Dropdown.module.css';

function Dropdown({
  icon,
  children,
  onClick = false,
  disableAnimations = false
}: {
  icon: string;
  children?: ReactNode;
  onClick?: boolean;
  disableAnimations?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClick = () => setIsOpen(!isOpen);

  const style = {
    ...(disableAnimations ? null : { transform: 'rotate(180deg)' }),
    color: 'var(--blue-4)'
  };

  return (
    <article className={styles.menu}>
      {onClick ? (
        <span className={styles.onClickIcon} onClick={handleOnClick}>
          <i className={icon} style={isOpen ? style : {}} />
        </span>
      ) : (
        <span
          className={!disableAnimations ? styles.icon : styles.iconNoAnimation}
        >
          <i className={icon} />
        </span>
      )}

      <div
        className={styles.content}
        style={isOpen ? { display: 'block' } : {}}
      >
        {children}
      </div>
    </article>
  );
}

export default Dropdown;
