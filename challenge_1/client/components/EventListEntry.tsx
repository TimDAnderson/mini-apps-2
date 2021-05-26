import * as React from "react";
import styled from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';

const EntryContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 100px 100px 200px 100px 600px 100px 100px;

`;

export interface EventListListProps {
  category1: string;
  category2: string;
  date: string;
  description: string;
  granularity: string;
  lang: string;
  key: number;
  isFavorite: boolean;
  index: number
  checkHandler: any;
  checkTracker: any;
}

export const EventListEntry = (props: EventListListProps) => {
  let isChecked = false
  if (props.checkTracker[props.index]) {
    isChecked = true
  }

  // need to get the key and pass it up
  return (
    <EntryContainer>
      <Checkbox
        checked={isChecked}
        onClick={props.checkHandler}
        inputProps={{ 'aria-label': `${props.index}` }}
        style={{
          color: "black",
          width: 36,
          height: 36
        }}
      />
      <div>{props.category1}</div>
      <div>{props.category2}</div>
      <div>{props.date}</div>
      <div>{props.description}</div>
      <div>{props.granularity}</div>
      <div>{props.lang}</div>
    </EntryContainer>
  )
};
