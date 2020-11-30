import { useApolloClient } from '@apollo/client';
import { makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import React, { useRef, useState } from 'react';
import { SearchTracksQuery, SearchTracksQueryVariables } from '../../api/graphql/api';
import { SEARCH_TRACKS } from '../../api/graphql/queries';

const styles = makeStyles((theme: Theme) => ({
  root: {
    padding: '2px 4px',
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
}));
export type SearchTracksType = {
  tracks: Pick<SearchTracksQuery, 'tracks'>;
};

const SearchTracks = ({
  setSearchResults,
}: {
  setSearchResults: React.Dispatch<SearchTracksQuery>;
}) => {
  const classes = styles();
  const [search, setSearch] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);
  const client = useApolloClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await client.query<SearchTracksQuery, SearchTracksQueryVariables>({
      query: SEARCH_TRACKS,
      variables: {
        search,
      },
    });
    // console.log('res ', data);

    setSearchResults(data);
  };

  const clearSearchInput = () => {
    setSearchResults(([] as unknown) as SearchTracksQuery);
    setSearch('');
    inputEl.current?.focus();
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Paper className={classes.root} elevation={1}>
        <IconButton onClick={clearSearchInput}>
          <ClearIcon />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Search All Tracks"
          InputProps={{
            disableUnderline: true,
          }}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          inputRef={inputEl}
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  );
};

export default SearchTracks;
