import * as React from "react";
import { FavoritesListEntry } from './FavoritesListEntry'

export interface FavoritesComponentProps {
  favorites: Array<Object>;
}

export interface FavoritesListEntryObj {
  category1: string;
  category2: string;
  date: string;
  description: string;
  granularity: string;
  lang: string;
  key: number;
  isFavorite: boolean;
}

export const FavoritesComponent = (props: FavoritesComponentProps) => {

  return (
    <div>
      {props.favorites.map(({category1, category2, date, description, granularity, lang, isFavorite} : FavoritesListEntryObj, index: number)=>{
        return <FavoritesListEntry
          category1={category1}
          category2={category2}
          date={date}
          description={description}
          granularity={granularity}
          lang={lang}
          key={index}
          isFavorite={isFavorite}
        />
      })}
    </div>
  )
}