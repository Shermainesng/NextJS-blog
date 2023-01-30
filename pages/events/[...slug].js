import { useRouter } from "next/router";
import { Fragment, useEffect, useState} from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { getFilteredEvents } from "../../helpers/api-util";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import Head from 'next/head';

function FilteredEventsPage(props) {
  const router = useRouter();

  const filterData = router.query.slug;

  const pageHeadData = (
    <Head>
        <title>Events for {`${props.date.month }/${props.date.year}`}</title>
        <meta
          name="description" 
        content={`All events for ${props.date.month }/${props.date.year}`}
        />
      </Head>
  );

  if (!filterData) {
    return <Fragment>
      {pageHeadData}
      <p className="center">Loading...</p>
    </Fragment>
  }

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <p>No events found for the chosen filter!</p>;
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <Head>
        <title>Events for {`${props.date.month }/${props.date.year}`}</title>
        <meta
          name="description" 
        content={`All events for ${props.date.month }/${props.date.year}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const {params} = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  //transform data to a number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  //checking if data are numbers - don't allow inputs like 'abc'
  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return {
      props: {hasError: true}
      // notFound: true, 
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  return {
    props: {
      events: filteredEvents, 
      date: {
        year: numYear, 
        month: numMonth
      }
    }
  }
}

export default FilteredEventsPage;
