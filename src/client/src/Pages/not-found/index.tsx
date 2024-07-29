import { Link, Loader, PageLayout } from '../../Components';

const NotFound = () => {
  return (
    <PageLayout title="Page not Found" heading="Page not found.">
      <article className="flex flex-col items-center p-4">
        <Loader type="player" />

        <p className="text-lg p-2">
          No page here, back to{' '}
          <Link to="/" type="link" className="underline">
            Home
          </Link>
          ?
        </p>
      </article>
    </PageLayout>
  );
};

export default NotFound;
