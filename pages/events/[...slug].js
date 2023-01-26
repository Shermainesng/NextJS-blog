import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { getFilteredEvents } from "../../dummy-data";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  console.log(filterData);

  //if filterData is faulty (no data), which will be when this component is rendered for the first time
  if (!filterData) {
    return <p className="center">Loading...</p>; //from globals.css
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  //transform data to a number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  //checking if data are numbers - don't allow inputs like 'abc'
  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>;
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <p>No events found for the chosen filter!</p>;
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
