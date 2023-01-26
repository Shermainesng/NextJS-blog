//fetch all events, then filter

export async function getAllEvents() {
  const response = await fetch("https://nextjs-course-6bd33-default-rtdb.firebaseio.com/events.json"); //firebase db url
  const data = await response.json();

  const events = [];

  //events is an array fill of objects
  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find(event => event.id === id);
}
