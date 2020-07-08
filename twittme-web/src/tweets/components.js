import React, { useEffect, useState } from "react";

//import {loadTweets} from '../lookup'
import { createTweet, loadTweets } from "../lookup";

export function TweetsComponent(props) {
  const textAreaRef = React.createRef();

  const [newTweets, setNewTweets] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newVal = textAreaRef.current.value;
    let tempNewTweets = [...newTweets];

    createTweet(newVal, (response, status) => {
      if (status === 201) {
        //put it to the beginning
        tempNewTweets.unshift(response);
      } else {
        console.log(response);
        alert("An error occured please try again");
      }
    });
    /*
    tempNewTweets.unshift({ //put it to the beginning
      content: newVal,
      likes: 0,
      id: 12313
    })
    */
    setNewTweets(tempNewTweets);

    textAreaRef.current = ""; //after the submission, clear the textarea
  };
  return (
    <div className={props.className}>
      <div className="col-12 mb-3">
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
      <TweetsList newTweets={newTweets} />
    </div>
  );
}

export function TweetsList(props) {
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
      const myCallback = (response, status) => {
        if (status === 200) {
          setTweetsInit(response);
          setTweetsDidSet(true);
        } else {
          alert("There was an error");
        }
      };
      loadTweets(myCallback);
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet]);

  return tweets.map((item, index) => {
    return (
      <Tweet
        tweet={item}
        className="my-5 py-5 border bg-white text-dark"
        key={`${index}-{item.id}`}
      />
    );
  });
}

export function ActionBtn(props) {
  const { tweet, action } = props;
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);

  //const [justClicked, setJustClicked] = useState(false)
  const [userLike, setUserLike] = useState(
    tweet.userLike === true ? true : false
  );

  const className = props.className
    ? props.className
    : "btn btn-primary btn-sm";
  const actionDisplay = action.display ? action.display : "Action"; //ensure that we have an action

  const handleClick = (event) => {
    event.preventDefault();
    if (action.type === "like") {
      //if(justClicked === true){
      if (userLike === true) {
        setLikes(likes - 1);
        setUserLike(false);
      } else {
        setLikes(likes + 1);
        setUserLike(true);
      }
      //setLikes(tweet.likes+1)
    }
  };

  const display =
    action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay;
  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
}

export function Tweet(props) {
  const { tweet } = props;
  const className = props.className
    ? props.className
    : "col-10 mx-auto col-md-6";
  return (
    <div className={className}>
      <p>
        {tweet.id} - {tweet.content}
      </p>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
        <ActionBtn
          tweet={tweet}
          action={{ type: "unlike", display: "Unlike" }}
        />
        <ActionBtn
          tweet={tweet}
          action={{ type: "retweet", display: "Retweet" }}
        />
      </div>
    </div>
  );
}
