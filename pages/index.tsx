import Head from "next/head";
import NewsletterRegistration from '../components/input/newsletter-registration';
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Awesome NextJs Events</title>
        <meta
          name="description"
          content="Awesome app build it in Nextjs to learn the framework of Reactjs"
        />
      </Head>
      <h1 className="center">Home Page</h1>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </>
  )
}

export async function getStaticProps(context: any) {
  const featuredEvents = await getFeaturedEvents();
  const secondsToRefresh = 1800;

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: secondsToRefresh,
  };
}