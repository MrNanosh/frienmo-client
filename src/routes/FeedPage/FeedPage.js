import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./FeedPage.css";
import PublicFeed from "../../components/PublicFeed/PublicFeed";
import FriendsList from "../../components/FriendsList/FriendsList";

export default class FeedPage extends Component {
  render() {
    return (
      <div className="main-feed-container">


      <Tabs>
          <TabList>
            <Tab> Public </Tab>
            <Tab> Friends </Tab>
            <Tab> Wishful Frenmos </Tab>
          </TabList>
          <TabPanel>
            <PublicFeed />
          </TabPanel>
          <TabPanel>
            <FriendsList />
          </TabPanel>
          <TabPanel> 
            Sent Coupons
          </TabPanel>
        </Tabs>

      </div>
    );
  }
}



{/* <nav className="feed-menu">
          
<button>Mine</button>
<Link to="/dashboard">
  <button>Dash</button>
</Link>
<Link to="/send">
  <button>Send</button>
</Link>
</nav>
<div className="activity-container"> */}