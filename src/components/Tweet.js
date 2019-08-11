import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index'
import { TiHeartFullOutline } from 'react-icons/ti/index'

class Tweet extends Component {
    handleLike = (e) => {
        e.preventDefault()
    }
    toParent = (e, id) => {
        e.preventDefault()
        // redirect to parent tweet.

    }

    render() {
        const { tweet } = this.props

        if (tweet === null) {
            return <p>This tweet doesn't exist</p>
        }

        console.log(this.props)

        const {
            name, avatar, timestamp, text, likes, hasLiked, replies, id, parent
        } = tweet
        return (
            <div className='tweet'>
                <img
                    src={avatar}
                    alt={`avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className="replying-to" onclick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text} </p>
                    </div>

                <div className='tweet-icons'>
                    <TiArrowBackOutline className='tweet-icon' />
                    <span>{replies !== 0 && replies} </span>
                    <button className='heart-button' onClick={this.handleLike}>
                        {hasLiked === true
                            ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                            : <TiHeartOutline className='tweet-icon' />}
                    </button>
                    <span>{likes !== 0 && likes}</span>

                </div>
                </div>
            </div>
        )

    }
}

// Id comes from the props passed into the component. Its optional second arg.
function mapStateToProps({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id]

    const partentTweet = (tweet) ? tweets[tweet.replyingTo] : null;
    return {
        authedUser,
        tweet: tweet ?
            formatTweet(tweet, users[tweet.author], authedUser, partentTweet)
            : null
    }

}

export default connect(mapStateToProps)(Tweet)