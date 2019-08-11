import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
    state = {
        text: '',
    }

    handleChange = (e) => {
        const text = e.target.value

        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        // Todo: add tweet to store
        const { text } = this.state
        const { dispatch, id } = this.props
        const replyingTo = id
        
        dispatch(handleAddTweet(text, replyingTo))

        this.setState(() => ({
            text: '',
            toHome: id ? false : true
        }))
    }
    render() {
        const { text, toHome} = this.state
        if (toHome === true) {
            return <Redirect to='/' />
        }
        // Redirect to home view if submitted.
        const tweetLeft = 280 - text.length
        
        return (
            <div>
                <h3 className='center'> Compose New Tweet </h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="what's happening"
                        value={text}
                        onChange={this.handleChange}
                        className='text-area'
                        maxLength={280}
                    />

                {tweetLeft <= 100 && (
                    <div className='tweet-length'>
                        {tweetLeft}
                    </div>)}
                <button
                    className='btn'
                    type='submit'
                    disabled={text === ''}>
                        submit
                </button>
                </form>
            </div>

        )
    }
}

export default connect()(NewTweet)