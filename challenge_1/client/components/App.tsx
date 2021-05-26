import * as React from "react";
import axios from 'axios';
import styled from "styled-components";
import { SearchComponent } from './SearchComponent'
import { FavoritesComponent } from './FavoritesComponent'

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from "react-router-dom"

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  list-style: none;
`;

export const App = () => {

  var [events, setEvents] = React.useState<Array<Object>>([]);
  var [page, setPage] = React.useState<number>(1);
  var [numPages, setNumPages] = React.useState<number>(1);
  var [searchText, setSearchText] = React.useState<string>('');
  var [queryText, setQueryText] = React.useState<string>('');
  var [checkTracker, setCheckTracker] = React.useState<any>({});
  var [detectTrackerChange, setDetectTrackerChange] = React.useState<any>(0);
  var [favorites, setFavorites] = React.useState<Array<Object>>([]);

  const parseLinkHeader = ( linkHeader : any ) => {
    return Object.fromEntries( linkHeader.split( ", " ).map( (header : string) => header.split( "; " ) ).map( (header : string) => [ header[1].replace( /"/g, "" ).replace( "rel=", "" ), header[0].slice( 1, -1 ) ] ) );
  }

  React.useEffect(() => {
    dataFetcher();
  }, [page, queryText]);

  // favoriting something should not trigger another dataFecter API call
  React.useEffect(() => {
  }, [detectTrackerChange]);

  const dataFetcher = async () => {
    try {
      const response = await axios.get(encodeURI(`http://localhost:3000/events?_page=${page}${queryText}`))
      const arrayWithFavorite = response.data.map((v : any) => ({...v, isFavorite: false}))
      setEvents(arrayWithFavorite);
      const linksObj = parseLinkHeader(response.headers.link)
      setNumPages(Number(linksObj['last'].split('_page=')[1].split('&')[0]));
      setCheckTracker({});
    } catch (err) {
      console.log(err)
    }
  }

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // when this number is selected flip the is checked attribute
    const textIndexToChange = e.target.attributes[3]['value']
    const tempObject = checkTracker;
    if (!tempObject[textIndexToChange]) {
      tempObject[textIndexToChange] = true
    } else {
      tempObject[textIndexToChange] = false
    }
    // rerender after changes made to Object that doesn't trigger useEffect
    var newTemp = detectTrackerChange
    newTemp++
    setDetectTrackerChange(newTemp)
    setCheckTracker(tempObject)
  }

  const handleFavoriteSave = (e: any) => {
    e.preventDefault();
    let tempArray = []
    for (let property in checkTracker) {
      if (checkTracker[property]) {
        tempArray.push(events[Number(property)])
      }
    }
    tempArray = tempArray.concat(favorites)
    setFavorites(tempArray)
  }

  return (
    <Router>
      <h1>
        Hi welcome to the historical record looker upper
      </h1>
      <Link to='/'>Search</Link>
      <Link to='/favorites'>Favorites</Link>
      <Switch>
        <Route path="/favorites">
          <FavoritesComponent
            favorites={favorites}
          />
        </Route>
        <Route path="/">
          <SearchComponent
            handleFavoriteSave={handleFavoriteSave}
            searchText={searchText}
            setSearchText={setSearchText}
            setQueryText={setQueryText}
            setPage={setPage}
            events={events}
            checkHandler={checkHandler}
            checkTracker={checkTracker}
            page={page}
            numPages={numPages}
          />
        </Route>
      </Switch>
    </Router>
  )
};
