import moment from 'moment';

import { ItemComponentProps, ItemProps } from './types';
import { Link } from '../../../../Components';
import { Fragment } from 'react';

export default function Item({
  label,
  type = 'text',
  linkType,
  value
}: ItemProps) {
  return (
    <div>
      <span className="font-semibold text-lg">{label}: </span>
      {Component({ type, value, linkType })}
    </div>
  );
}

function Component({ type, value, linkType }: ItemComponentProps) {
  switch (type) {
    case 'link':
      return value ? (
        <Link type="link" to={`/${linkType}/${value?.uid}`}>
          {value?.name}
        </Link>
      ) : (
        <span className="text-lg text-neutral-400">None</span>
      );

    case 'links':
      return value.length ? (
        <span className="text-lg">
          {value.map((obj: any, i: number) => (
            <Fragment key={obj.uid}>
              <Link type="link" to={`/${linkType}/${obj.uid}`}>
                {obj.name}
              </Link>
              {value.length > i + 1 ? ', ' : ''}
            </Fragment>
          ))}
        </span>
      ) : (
        <span className="text-lg text-neutral-400">None</span>
      );

    case 'date':
      return value ? (
        <span className="text-lg">{moment(value).format('MMM Do YYYY')}</span>
      ) : (
        <span className="text-lg text-neutral-400">TBA</span>
      );

    default:
      return <span className="text-lg">{value}</span>;
  }
}
