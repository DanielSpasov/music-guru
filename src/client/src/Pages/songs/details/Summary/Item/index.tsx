import { Fragment, memo } from 'react';
import moment from 'moment';

import { Link } from '../../../../../Components';
import { BaseModel } from '../../../../../Types';
import {
  DateProps,
  ItemComponentProps,
  ItemProps,
  LinkProps,
  LinksProps,
  TextProps
} from './types';

// Composables
import MissingText from './MissingText';

const Item = <T extends BaseModel>({ label, ...props }: ItemProps<T>) => {
  return (
    <div>
      <span className="font-semibold text-lg">{label}: </span>
      {ItemComponent<T>(props)}
    </div>
  );
};

export default memo(Item);

const ItemComponent = <T extends BaseModel>({
  type = 'text',
  ...props
}: ItemComponentProps<T>) => {
  if (type === 'link') {
    const { value, linkType } = props as LinkProps<T>;
    if (!value) return <MissingText />;
    return (
      <Link type="link" to={`/${linkType}/${value.uid}`}>
        {value.name}
      </Link>
    );
  }

  if (type === 'links') {
    const { value, linkType } = props as LinksProps<T>;
    if (!value.length) return <MissingText />;
    return (
      <span className="text-lg">
        {value.map((item, i) => (
          <Fragment key={item.uid}>
            <Link type="link" to={`/${linkType}/${item.uid}`}>
              {item.name}
            </Link>
            {value.length > i + 1 ? ', ' : ''}
          </Fragment>
        ))}
      </span>
    );
  }

  if (type === 'date') {
    const { value } = props as DateProps;
    if (!value) return <MissingText message="TBA" />;
    return (
      <span className="text-lg">{moment(value).format('MMM Do YYYY')}</span>
    );
  }

  const { value } = props as TextProps;
  if (!value) return <MissingText />;
  return <span className="text-lg">{value}</span>;
};
