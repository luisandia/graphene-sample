import React, { useState, useRef } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';

const SearchTracks = ({ classes, setSearchResults }) => {

  const [search, setSearch] = useState("");
  const inputEl = useRef("");


  const handleSubmit = async (event, client) => {
    event.preventDefault();
    const res = await client.query({
      query: SEARCH_TRACKS_QUERY,
      variables: { search }
    });
    console.log(res);

    setSearchResults(res.data.tracks);
  }

  const clearSearchInput = () => {
    setSearchResults([]);
    setSearch("");
    inputEl.current.focus();
  }

  return (
    <ApolloConsumer>
      {
        client => (
          <form onSubmit={event => handleSubmit(event, client)}>
            <Paper className={classes.root} elevation={1}>
              <IconButton onClick={clearSearchInput}>
                <ClearIcon />
              </IconButton>
              <TextField
                fullWidth
                placeholder="Search All Tracks"
                InputProps={{
                  disableUnderline: true
                }}
                onChange={event => setSearch(event.target.value)}
                value={search}
                inputRef={inputEl}
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </Paper>
          </form>
        )}


    </ApolloConsumer>
  );
};

const SEARCH_TRACKS_QUERY = gql`
query($search:String){
  tracks(search:$search){
    id
    title
    description
    url
    likes{
      id
    }
    postedBy{
      id
      username
    }
  }
}
`;

const styles = theme => ({
  root: {
    padding: "2px 4px",
    margin: theme.spacing(1),
    display: "flex",
    alignItems: "center"
  }
});

export default withStyles(styles)(SearchTracks);
