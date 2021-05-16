/* eslint-disable no-underscore-dangle */
import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/Show/Cast';
import { Details } from '../components/Show/Details';
import Season from '../components/Show/Season';
import ShowMainData from '../components/Show/ShowMainData';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { ...prevState, isLoading: false, show: action.show, error: null };
    }

    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }

    default:
      return prevState;
  }
};
const initialState = {
  show: null,
  isLoading: true,
  error: null,
};
const Show = () => {
  const { id } = useParams();
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [show, setShow] = useState(null);
  // const [isLoading, setisLoading] = useState('true');
  // const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          if (isMounted) {
            dispatch({
              type: 'FETCH_SUCCESS',
              show: results,
            });
          }
        });
      }, 5000)

      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log('show', show);
  if (isLoading) return <div>Data is being loaded</div>;
  if (error) return <div>Error ocurred :{error}</div>;
  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>
      <div>
        <h2>Season</h2>
        <Season seasons={show._embedded.seasons} />
      </div>
      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
