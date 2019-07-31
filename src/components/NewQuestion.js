import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatNewQuestion } from '../utils/helpers'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'

class newQuestion extends Component {

  state = { optionOne: '', optionTwo: '' }

  handleInput = (e, selectedOption) => {
      switch(selectedOption) {
        case 'optionOne':
            this.setState({optionOne: e.target.value});
            break;
        case 'optionTwo':
            this.setState({optionTwo: e.target.value});
            break;
        default:
            this.setState({ optionOne: '', optionTwo: ''})
      }
      
  }

  handleSubmit() {
      const { optionOne, optionTwo } = this.state
      const { authedUser, handleAddQuestion} = this.props
      const newQuestion = formatNewQuestion(optionOne, optionTwo, authedUser)
      handleAddQuestion(newQuestion)
  }

  render() {
    
    return (
        <div className='newQuestion'>
            <div>
                <div className='form-group'>
                    <label className='question-copy'>Would you rather</label>
                    <input className='form-control' placeholder='Option 1' onChange={(e) => this.handleInput(e, 'optionOne')} />
                    <label className='question-copy'>or</label>
                    <input className='form-control' placeholder='Option 2' onChange={(e) => this.handleInput(e, 'optionTwo')}/>
                </div>
                <button className="btn btn-primary" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
      </div>
    )

  }

}



function mapStateToProps ({ questions, authedUser, dispatch }) {

  return {
    questions,
    authedUser,
    dispatch,
  }

}

function mapDispatchToProps (dispatch) {

    return {
        handleAddQuestion: (newQuestion) => {
            dispatch(handleAddQuestion(newQuestion))
        }
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(newQuestion))