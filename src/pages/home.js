import React, { useState } from 'react';
import Mainpagelayout from '../components/Mainpagelayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    // http://api.tvmaze.com/search/shows?q=girls;
    const queryString = `/search/shows?q=${input}`;
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
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <Mainpagelayout>
      This is Home page
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </Mainpagelayout>
  );
};

export default Home;
