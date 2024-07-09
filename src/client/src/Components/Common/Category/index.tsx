import { FC, memo } from 'react';

import { CategoryProps } from './types';

const Category: FC<CategoryProps> = ({
  separate = false,
  title,
  children,
  className,
  ...props
}) => {
  return (
    <section
      data-testid="category"
      className={`flex flex-col gap-1 ${className}`}
      {...props}
    >
      {separate && (
        <hr
          data-testid="category-separator"
          className="mt-1 dark:border-neutral-700"
        />
      )}
      {title && <h4 className="text-neutral-500">{title}</h4>}
      {children}
    </section>
  );
};

export default memo(Category);