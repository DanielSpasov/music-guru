import { Link, PageLayout } from '../../Components';

const NotOwner = () => {
  return (
    <PageLayout title="Access Denied" heading="Access Denied">
      <article className="flex flex-col items-center p-4">
        <h2 className="text-red-400">Error Code: 403</h2>

        <p className="text-lg p-2">
          Access denied, go back to{' '}
          <Link to="/" type="link" className="underline">
            Home
          </Link>
          ?
        </p>
      </article>
    </PageLayout>
  );
};

export default NotOwner;
