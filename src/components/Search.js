import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);
  // console.log('all render')
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });
      console.log(data.query.search)
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

//   useEffect(() => {
//     const search = async () => {
//       const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
//         params: {
//           action: 'query',
//           list: 'search',
//           origin: '*',
//           format: 'json',
//           srsearch: term,
//         },
//       });
//       setResults(data.query.search);
//     };
//     if (term && !results.length) {
//       search();
//     } else {
//       const timeoutid = setTimeout(() => {
//         if (term) {
//           search();
//         }
//       }, 500);

//       return () => {
//         clearTimeout(timeoutid);
//       };
//     }
//   }, [term, results.length]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Search Wikipedia</label>
          <input
            className="input"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
