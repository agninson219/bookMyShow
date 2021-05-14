import React, { useState } from 'react';
import ActorGrid from '../components/Actor/ActorGrid';
import Mainpagelayout from '../components/Mainpagelayout';
import ShowGrid from '../components/Show/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    // http://api.tvmaze.com/search/shows?q=girls;
    const queryString = `/search/${searchOption}?q=${input}`;
    apiGet(queryString).then(result => {
      //  here we encapsulated in api fetch logic
      setResults(result);
    });

    //  to call any browser API...and the fetch function return promise so we need to await it.
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        //  results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        <ShowGrid data={results} />
      ) : (
        // results.map(item => (
        // <div key={item.person.id}>{item.person.name}</div>
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOption);
  return (
    <Mainpagelayout>
      This is Home page
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="show">
          Shows
          <input
            type="radio"
            id="show"
            onChange={onRadioChange}
            value="shows"
            checked={isShowsSearch}
          />
        </label>
        <label htmlFor="actor">
          Actor
          <input
            type="radio"
            id="actor"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </Mainpagelayout>
  );
};

export default Home;
