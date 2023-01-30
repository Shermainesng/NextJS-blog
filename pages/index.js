import Head from 'next/head';
import { Fragment } from "react";
import { useRouter } from "next/router";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";

function FeaturedEventsPage(props) {
  const router = useRouter();
  function findEventsHandler(year, month){
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
  return (
    <div>
      <Head>
        <title>NEXTJS Events</title>
        <meta
          name="description" 
          content="Find great events"
        />
      </Head>
      <Fragment>
        <EventsSearch onSearch={findEventsHandler} />
        <EventList items = {props.featuredEvents} />
      </Fragment>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents
    }, 
    revalidate: 60
  };
}

export default FeaturedEventsPage;
