import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';

function AllEvents() {
  const router = useRouter();
  const allEvents = getAllEvents();

  //if we search by filter - dec,2022 --> we get '/events/2022/12', and it brings us to the filterevent page ([slug].js)
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>NEXTJS Events</title>
        <meta
          name="description" 
          content="Find great events"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
}

export default AllEvents;
