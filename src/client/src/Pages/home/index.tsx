import { Loader, PageLayout } from '../../Components';

export default function Home() {
  return (
    <PageLayout title="Home">
      <div className="flex justify-center">
        <Loader type="player" />
        <Loader type="vinyl" size="sm" />
        <Loader type="vinyl" size="lg" />
        <Loader type="spinner" size="sm" />
        <Loader type="spinner" size="lg" />
      </div>
    </PageLayout>
  );
}
