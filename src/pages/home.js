import React, { useState } from 'react';
import Mainpagelayout from '../components/Mainpagelayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    // http://api.tvmaze.com/search/shows?q=girls;
    fetch(`http://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json()) // request sends a response object so we need to convert it into json format..
      .then(result => {
        console.log(result);
      });
    //  to call any browser API...and the fetch function return promise so we need to await it.
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
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
    </Mainpagelayout>
  );
};

export default Home;
