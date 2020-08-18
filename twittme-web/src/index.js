import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProfileBadgeComponent } from "./profiles"; 
import * as serviceWorker from "./serviceWorker";

import { TweetsComponent, TweetDetailComponent, FeedComponent } from "./tweets";

const appEl = document.getElementById("root");
if (appEl) {
  ReactDOM.render(<App />, appEl);
}
const e = React.createElement;
const tweetsEl = document.getElementById("tweetme-2");
if (tweetsEl) {
  const MyComponent = e(TweetsComponent, tweetsEl.dataset);
  ReactDOM.render(MyComponent, tweetsEl);
}

const tweetFeedEl = document.getElementById("tweetme-2-feed");
if (tweetFeedEl) {
  const MyComponent = e(FeedComponent, tweetFeedEl.dataset);
  ReactDOM.render(MyComponent, tweetFeedEl);
}

const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail"); //get all elements with this class

//render for each tweet detail element
tweetDetailElements.forEach((container) => {
  ReactDOM.render(e(TweetDetailComponent, container.dataset), container);
});


//new
const userProfileBadgeElements = document.querySelectorAll(".tweetme-2-profile-badge"); //get all elements with this class

userProfileBadgeElements.forEach((container) => {
  ReactDOM.render(e(ProfileBadgeComponent, container.dataset), container);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
