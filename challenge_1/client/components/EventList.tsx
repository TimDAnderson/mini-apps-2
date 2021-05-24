import * as React from "react";
import { EventListEntry } from './EventListEntry';

export interface EventListProps {
  eventsList: Array<Object>;
}

export const EventList = (props: EventListProps) => {

  return (
    <div>{ props.eventsList.map((eventEntry, index) => {
      return <EventListEntry
        category1={eventEntry['category1']}
        category2={eventEntry['category2']}
        date={eventEntry['date']}
        description={eventEntry['description']}
        granularity={eventEntry['granularity']}
        lang={eventEntry['lang']}
        key={index}
      />
    }) }</div>
  )
};
