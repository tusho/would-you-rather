import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question.js'

class Dashboard extends Component {

  state = {filteredQuestions: this.props.questions};

  handleChange = (e) => {
     

    const selectedValue = e.target.value.toString()


    const resetForm = () => {
      const selector = document.getElementsByTagName('select');
      for (let i = 0; i < selector.length; i++) { 
        selector[i].selectedIndex = 0;
      }
      document.getElementById('filterSelect').blur();
    }

    switch(selectedValue) {
      case 'answered':
          this.setState({filteredQuestions: this.props.answeredQuestions});
          break;
      case 'unanswered':
          this.setState({filteredQuestions: this.props.unansweredQuestions});
          break;
      case 'clearFilter':
        this.setState({filteredQuestions: this.props.questions});
        resetForm();
        break;
      default:
          this.setState({filteredQuestions: this.props.questions});
    }

  }


  render() {

    const { filteredQuestions } = this.state
    
    return (
      <div>
        <h3 className='poll-headline text-center'>Polls</h3>
          <div className='row m-auto filter'>
            <select className='dropdown' id='filterSelect' defaultValue='unanswered' onChange={(e) => this.handleChange(e)}>
                <option value='none' disabled>Select filter...</option>
                <option value='unanswered'>Unanswered Questions</option>
                <option value='answered'>Answered Questions</option>
                <option value='clearFilter'>Clear filter</option>
            </select>
          </div>
          <ul className='list-unstyled'>
              {filteredQuestions !== null && filteredQuestions.map((id) => (
                  <Question id={id}  key={id}/>
              ))}
          </ul>
      </div>
    )

  }

}


function mapStateToProps ({ questions, authedUser }, { id }) {

  return {
    id,
    questions: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions: Object.values(questions).filter((question) => (question.optionOne.votes.concat(question.optionTwo.votes).includes(authedUser))).map(question => {return question.id}).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQuestions: Object.values(questions).filter((question) => !(question.optionOne.votes.concat(question.optionTwo.votes).includes(authedUser))).map(question => {return question.id}).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
  }

}


export default connect(mapStateToProps)(Dashboard)