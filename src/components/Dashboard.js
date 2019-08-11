import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweet  from './Tweet';

class Dashboard extends Component {
    render() {

        return (
            <div>
                <h3 className='center'> Your Timeline </h3>
                <ul className='dashboard-list'>
                    {this.props.tweetIds.map((tweetID) => (
                        <li key={tweetID}>
                            <Tweet id={tweetID} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

    // Takes in state as an argument but we're going to deconstruct tweets.
function mapStateToProps({ tweets }) {
    return {
        tweetIds: Object.keys(tweets)
            .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)