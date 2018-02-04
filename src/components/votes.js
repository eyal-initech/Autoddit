import React from 'react'
import {
  Feed,
  Icon,
  Statistic,
} from 'semantic-ui-react'

const labelStyling = {
  opacity: 1,
  fontSize: '1.2em',
  width: '100%',
  color: 'rgba(0, 0, 0, 0.6)',
  margin: 0
};

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasVoted: false};
    this.vote = this.vote.bind(this);
  }

  vote(vote) {
    if (this.state.hasVoted === vote) {
      return
    }

    this.props.voteHandler(this.props.id, vote, this.props.upvotes);
    this.setState({hasVoted: vote});
  }

  render() {
    return (
      <Feed.Label style={{'textAlign': 'center'}}>
        <Icon className='fa-arrow-up' onClick={() => this.vote('up')} style={(this.props.withStyling) ? labelStyling : {}}/>
        <Statistic as='span' size='small' style={{margin: '0'}}>
          <Statistic.Value as='span'>{this.props.upvotes}</Statistic.Value>
        </Statistic>
        <Icon className='fa-arrow-down' onClick={() => this.vote('down')} style={(this.props.withStyling) ? labelStyling : {}} />
      </Feed.Label>
    );
  }
}

export default Vote
