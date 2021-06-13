import React, { useState } from 'react';

export default function SearchBox(props) {
  const [title, setTitle] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/title/${title}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          className="text-line bb-white text-white"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        &nbsp;&nbsp;
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}