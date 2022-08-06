import { ReactNode, useMemo, useState } from 'react';
import styles from './Dropdown.module.css';

function Dropdown({
  icon,
  children,
  width = '6.5rem',
  onClick = false,
  disableAnimations = false
}: {
  icon: string;
  children?: ReactNode;
  width?: string;
  onClick?: boolean;
  disableAnimations?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClick = () => setIsOpen(!isOpen);

  const hoverIconClassName = useMemo(() => {
    return !disableAnimations ? styles.icon : styles.iconNoAnimation;
  }, [disableAnimations]);

  const clickIconStyle = useMemo(() => {
    return isOpen
      ? {
          ...(disableAnimations ? null : { transform: 'rotate(180deg)' }),
          color: 'var(--blue-4)'
        }
      : {};
  }, [disableAnimations, isOpen]);

  const contentStyle = useMemo(() => {
    return isOpen
      ? {
          display: 'flex',
          width
        }
      : {};
  }, [isOpen, width]);

  return (
    <article className={styles.menu}>
      {onClick ? (
        <span className={styles.onClickIcon} onClick={handleOnClick}>
          <i className={icon} style={clickIconStyle} />
        </span>
      ) : (
        <span className={hoverIconClassName}>
          <i className={icon} />
        </span>
      )}

      <div className={styles.content} style={contentStyle}>
        {children}
      </div>
    </article>
  );
}

export default Dropdown;
