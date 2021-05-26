import * as React from "react";
import ReactPaginate from 'react-paginate';
import styled from "styled-components";
import { EventList } from './EventList';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  list-style: none;
`;

export interface SearchComponentProps {
  handleFavoriteSave: any;
  searchText: string;
  setSearchText: any;
  setQueryText: any;
  setPage: any;
  events: any;
  checkHandler: any;
  checkTracker: any;
  page: any;
  numPages: any;
}

export const SearchComponent = (props: SearchComponentProps) => {

  return (
    <div>
      <h2>Narrow down your search results by typing in key words and hitting the submit button</h2>
      <SearchContainer>
        <form onSubmit={props.handleFavoriteSave}>
          <label>Check then press save to save favorites</label>
          <input type="submit" value="Save Checked" />
        </form>
        <form onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          console.log(props.searchText);
          props.setQueryText(`&q=${props.searchText}`);
          props.setPage(1);
        }}>
          <label>
            Search by keyword:
            <input type="text" value={props.searchText} onChange={e => props.setSearchText(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>hi</div>
      </SearchContainer>
      <EventList eventsList={props.events} checkHandler={props.checkHandler} checkTracker={props.checkTracker}/>
      <ReactPaginate
        onPageChange={(e) => {props.setPage(e.selected + 1)}}
        previousLabel={'previous page'}
        initialPage={(props.page - 1)}
        pageCount={props.numPages}
        pageRangeDisplayed={10}
        marginPagesDisplayed={5}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  )
}