import { Icon, Loader } from '../../../Components';
import { UserListProps } from './helpers';

export default function UserList({
  items,
  loading,
  action,
  missingMessage,
  icon
}: UserListProps) {
  return (
    <article
      className={`bg-neutral-200 dark:bg-neutral-950 w-full rounded-md p-2 mt-2`}
    >
      {items.length ? (
        <>
          <section className="flex px-2">
            <p className="text-lg font-bold w-1/3">Username</p>
            <p className="text-lg font-bold w-2/3">UID</p>
          </section>

          <section>
            {!loading ? (
              items.map(user => (
                <div
                  key={user.uid}
                  className="flex justify-between p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-800 cursor-pointer"
                  onClick={() => action(user.uid)}
                >
                  <p className="w-1/3">{user.username}</p>
                  <p className="w-2/3">{user.uid}</p>
                  <Icon model={icon} className="w-6 h-6" />
                </div>
              ))
            ) : (
              <Loader size="sm" />
            )}
          </section>
        </>
      ) : (
        <p className="text-center">{missingMessage}</p>
      )}
    </article>
  );
}
