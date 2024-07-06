import { Loader, PageLayout } from '../../Components';

export default function Home() {
  return (
    <PageLayout title="Home" heading="Home">
      <div className="flex justify-center">
        <Loader type="player" />
      </div>
    </PageLayout>
  );
}
