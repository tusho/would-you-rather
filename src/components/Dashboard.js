import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question.js'

class Dashboard extends Component {

  state = {filteredQuestions: this.props.questionIds};

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
      case 'yourQuestions':
          this.setState({filteredQuestions: this.props.authedUserQuestionIds});
          break;
      case 'otherQuestions':
          this.setState({filteredQuestions: this.props.unAuthedUserQuestionIds});
          break;
      case 'clearFilter':
        this.setState({filteredQuestions: this.props.questionIds});
        resetForm();
        break;
      default:
          this.setState({filteredQuestions: this.props.questionIds});
    }

  }


  render() {

    const { filteredQuestions } = this.state

    return (
      <div>
        <h3 className='text-center'>Polls</h3>
          <div className='row m-auto filter'>
            <select className='dropdown' id='filterSelect' defaultValue={'none'} onChange={(e) => this.handleChange(e)}>
                <option value='none' disabled>Select filter...</option>
                <option value='yourQuestions'>Your questions</option>
                <option value='otherQuestions'>Questions by others</option>
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
    questionIds: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    authedUserQuestionIds: Object.values(questions).filter((question) => (question.author === authedUser )).map(question => {return question.id}).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    unAuthedUserQuestionIds: Object.values(questions).filter((question) => (question.author !== authedUser )).map(question => {return question.id}).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
  }

}


export default connect(mapStateToProps)(Dashboard)