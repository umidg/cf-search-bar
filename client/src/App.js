import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [appState, setappState] = useState({
    searchtext: "",
    results: [],
  });

  const changedText = (e) => {
    setappState({ ...appState, searchtext: e.target.value });
  };
  useEffect(() => {
    (async function () {
      if (appState.searchtext.length > 1) {
        await fetch(
          process.env.REACT_APP_BACKEN_URL + "/search?q=" + appState.searchtext
        )
          .then((response) => {
            if (response && response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            setappState({ ...appState, results: data });
          });
      } else {
        setappState({ ...appState, results: [] });
      }
    })();
  }, [appState.searchtext]);

  return (
    <div className="container">
      <div className="input-blocks">
        <input
          type="text"
          placeholder="Search..."
          onChange={changedText}
        ></input>
      </div>
      <div className="input-blocks">
        <ul
          style={{
            border:
              appState.results &&
              appState.results.length > 0 &&
              "1px solid #cccccc",
          }}
        >
          {appState.results &&
            appState.results.map((node, index) => {
              return <ol key={index}>{node["Search Terms"]}</ol>;
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
