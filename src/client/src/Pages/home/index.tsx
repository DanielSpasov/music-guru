import { Loader, PageLayout } from '../../Components';

const Home = () => {
  return (
    <PageLayout title="Home" heading="Home" hideFooter>
      <div className="flex justify-center">
        <Loader type="player" />
      </div>
    </PageLayout>
  );
};

export default Home;
