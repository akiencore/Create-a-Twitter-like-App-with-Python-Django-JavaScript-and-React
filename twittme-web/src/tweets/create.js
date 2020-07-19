import React from "react";

import { apiTweetCreate } from "./lookup";

export function TweetCreate(props) {
  const textAreaRef = React.createRef();

  const { didTweet } = props;

  const handleBackendUpdate = (response, status) => {
    if (status === 201) {
      didTweet(response);
    } else {
      console.log(response);
      alert("An error occured please try again");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newVal = textAreaRef.current.value;

    console.log("new value", newVal);

    apiTweetCreate(newVal, handleBackendUpdate);

    textAreaRef.current.value = ""; //after the submission, clear the textarea
  };

  return (
    <div className={props.className}>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textAreaRef}
          required={true}
          className="form-control"
          name="tweet"
        ></textarea>
        <button type="submit" className="btn btn-primary my-3">
          Tweet
        </button>
      </form>
    </div>
  );
}
