import { useMemo, useState } from 'react';

import { IMagnifyingGlass, Loader } from '../../../Components';
import { UserListProps } from './helpers';

const lightInputProps =
  'border-b-neutral-300 hover:border-b-neutral-400 focus:border-b-primary';
const darkInputProps =
  'dark:border-b-neutral-800 dark:hover:border-b-neutral-600 dark:focus:border-b-primary-dark';
const themeInputProps = `${lightInputProps} ${darkInputProps}`;

export default function UserList({
  items,
  loading,
  action,
  missingMessage,
  Icon
}: UserListProps) {
  const [search, setSearch] = useState('');

  const displayedItems = useMemo(() => {
    if (!search) return items;
    return items.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  return (
    <article
      className={`bg-neutral-200 dark:bg-neutral-950 w-full rounded-md p-2 mt-2`}
    >
      <div className="relative">
        <input
          onChange={e => setSearch(e.target.value)}
          className={`bg-transparent border-b-2 outline-none w-full p-1 mb-2 text-lg ${themeInputProps}`}
          placeholder="Search..."
          type="text"
        />

        <IMagnifyingGlass className="absolute top-0 right-0 w-8 h-8" />
      </div>

      {displayedItems.length ? (
        <>
          <section className="flex px-2">
            <p className="text-lg font-bold w-1/3">Username</p>
            <p className="text-lg font-bold w-2/3">UID</p>
          </section>

          <section>
            {!loading ? (
              displayedItems.map(user => (
                <div
                  key={user.uid}
                  className="flex justify-between p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-800 cursor-pointer"
                  onClick={() => action(user.uid)}
                >
                  <p className="w-1/3">{user.username}</p>
                  <p className="w-2/3">{user.uid}</p>

                  <Icon className="w-6 h-6" />
                </div>
              ))
            ) : (
              <Loader type="vinyl" />
            )}
          </section>
        </>
      ) : (
        <p className="text-center">
          {search ? `No results for "${search}"` : missingMessage}
        </p>
      )}
    </article>
  );
}
