import * as React from "react";

export interface EventListListProps {
  category1: string;
  category2: string;
  date: string;
  description: string;
  granularity: string;
  lang: string;
}

export const EventListEntry = (props: EventListListProps) => {

  console.log('in the eventlist entry')

  return (
    <div>
      <div>{props.category1}</div>
      <div>{props.category2}</div>
      <div>{props.date}</div>
      <div>{props.description}</div>
      <div>{props.granularity}</div>
      <div>{props.lang}</div>
    </div>
  )
};