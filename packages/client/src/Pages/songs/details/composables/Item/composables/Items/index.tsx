import { ElementType, FC, Fragment } from 'react';
import moment from 'moment';

import { DateProps, ItemType, LinkProps, LinksProps, TextProps } from './types';
import { BaseModel } from '../../../../../../../Types';
import { Link } from '../../../../../../../Components';

// Composables
import MissingText from '../MissingText';

const Link_ = <T extends BaseModel>({ value, linkType }: LinkProps<T>) => {
  if (!value) return <MissingText />;
  return (
    <Link type="link" to={`/${linkType}/${value.uid}`}>
      {value.name}
    </Link>
  );
};

const Links = <T extends BaseModel>({
  value,
  linkType,
  missingText
}: LinksProps<T>) => {
  if (!value.length) return <MissingText message={missingText} />;
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
};

const Text: FC<TextProps> = ({ value }) => {
  if (!value) return <MissingText />;
  return <span className="text-lg">{value}</span>;
};

const Date: FC<DateProps> = ({ value }) => {
  if (!value) return <MissingText message="TBA" />;
  return <span className="text-lg">{moment(value).format('MMM Do YYYY')}</span>;
};

const Items: Record<ItemType, ElementType> = {
  date: Date,
  link: Link_,
  links: Links,
  text: Text
};

export default Items;
