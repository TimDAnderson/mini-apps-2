import * as React from "react";

export interface FavoritesListListProps {
  category1: string;
  category2: string;
  date: string;
  description: string;
  granularity: string;
  lang: string;
  key: number;
  isFavorite: boolean;
}

export const FavoritesListEntry = (props: FavoritesListListProps) => {

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
}