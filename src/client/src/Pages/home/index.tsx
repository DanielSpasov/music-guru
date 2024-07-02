import { Loader, PageLayout } from '../../Components';

export default function Home() {
  return (
    <PageLayout title="Home">
      <div className="flex justify-center">
        <Loader type="player" />
      </div>
    </PageLayout>
  );
}
