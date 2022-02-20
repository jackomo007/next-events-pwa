import Head from "next/head";

import EventSearch from "../../components/events/events-search";
import EventList from "../../components/events/event-list";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All the NextJs Events</title>
        <meta name="description" content="List of awesome events..." />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  const secondsToRefresh = 60;

  return {
    props: {
      events: events,
    },
    revalidate: secondsToRefresh,
  };
}

export default AllEventsPage;
