import React, { useEffect, useState } from "react";

import { apiTweetList } from "./lookup";

import { Tweet } from "./detail";

export function TweetsList(props) {
  //console.log(props.username)
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);

  const [tweetsDidSet, setTweetsDidSet] = useState(false);

  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit); //[...content] means a new list with the content
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweets, tweets, tweetsInit]);

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setTweetsInit(response);
          setTweetsDidSet(true);
        } else {
          alert("There was an error");
        }
      };
      apiTweetList(props.username, handleTweetListLookup);
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]);

  //new
  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]; //grabbing tweetsInit list
    updateTweetsInit.unshift(newTweet); //add newTweet to the beginning of updateTweetsInit
    setTweetsInit(updateTweetsInit); //update status
    const updateFinalTweets = [...tweets]; //grabbing tweets list
    updateFinalTweets.unshift(tweets); //add tweets to the beginning of updateFinalTweets
    setTweets(updateFinalTweets); //update status
  };

  return tweets.map((item, index) => {
    return (
      <Tweet
        tweet={item}
        didRetweet={handleDidRetweet} //new
        className="my-5 py-5 border bg-white text-dark"
        key={`${index}-{item.id}`}
      />
    );
  });
}
