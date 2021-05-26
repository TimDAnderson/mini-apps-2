import * as React from "react";
import { EventListEntry } from './EventListEntry';

export interface EventListProps {
  eventsList: Array<Object>;
  checkHandler: any;
  checkTracker: any;
}

export interface  EventListEntryObj {
  category1: string;
  category2: string;
  date: string;
  description: string;
  granularity: string;
  lang: string;
  key: number;
  isFavorite: boolean;
}

export const EventList = (props: EventListProps) => {

  return (
    <div>{ props.eventsList.map(({category1, category2, date, description, granularity, lang, isFavorite} : EventListEntryObj, index: number) => {
      return <EventListEntry
        category1={category1}
        category2={category2}
        date={date}
        description={description}
        granularity={granularity}
        lang={lang}
        key={index}
        isFavorite={isFavorite}
        checkHandler={props.checkHandler}
        checkTracker={props.checkTracker}
        index={index}
      />
    }) }</div>
  )
};
