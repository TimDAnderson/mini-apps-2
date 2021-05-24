import * as React from "react";
import axios from 'axios';
import { EventList } from './EventList';
// @ts-ignore
import ReactPaginate from 'react-paginate';

export interface IEventData {
  events: Array<Object>;
  page: number;
  numPages: number;
  searchText: string;
  queryText: string;
}

export const App = () => {

  var [events, setEvents] = React.useState([]);
  var [page, setPage] = React.useState(1);
  var [numPages, setNumPages] = React.useState(1);
  var [searchText, setSearchText] = React.useState('');
  var [queryText, setQueryText] = React.useState('');

  const parseLinkHeader = ( linkHeader : any ) => {
    return Object.fromEntries( linkHeader.split( ", " ).map( (header : string) => header.split( "; " ) ).map( (header : string) => [ header[1].replace( /"/g, "" ).replace( "rel=", "" ), header[0].slice( 1, -1 ) ] ) );
  }

  React.useEffect(() => {
    dataFetcher()
  }, [page, queryText]);

  const dataFetcher = async () => {
    try {
      console.log(`this is the page ${page}`)
      const response = await axios.get(encodeURI(`http://localhost:3000/events?_page=${page}${queryText}`))
      setEvents(response.data);
      console.log(response.headers.link)
      const linksObj = parseLinkHeader(response.headers.link)
      console.log(linksObj)
      setNumPages(Number(linksObj['last'].split('_page=')[1].split('&')[0]));
    } catch (err) {
      console.log(err)
    }
  }

  const paginationClickHandler = (data : any) => {
    // pagination index's at 0, json-server's pagination index's on 1
    setPage(data.selected + 1)
  }

  const handleSubmit = (e : any) => {
    e.preventDefault();
    console.log(searchText);
    setQueryText(`&q=${searchText}`);
    dataFetcher()
  }

  return (
    <div>
      <h1>
        Hi welcome to the historical record looker upper
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Search by keyword:
          <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <EventList eventsList={events} />
      <ReactPaginate
        // onPageChange={paginationClickHandler}
        onPageChange={paginationClickHandler}
        previousLabel={'previous page'}
        initialPage={(page - 1)}
        pageCount={numPages}
      />
    </div>
  )
};
