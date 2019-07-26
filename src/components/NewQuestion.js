import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveQuestion } from '../actions/questions'
import { formatNewQuestion } from '../utils/helpers'

class newQuestion extends Component {

  state = { optionOne: '', optionTwo: ''}

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
      const newQuestion = formatNewQuestion(this.state.optionOne, this.state.optionTwo, this.props.authedUser)
      this.props.saveQuestion(newQuestion)
  }

  render() {
    
    return (
        <div className='newQuestion'>
            <div>
                <h3>Congratulations! Your question has been added.</h3>
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
        saveQuestion: (newQuestion) => {
            dispatch(saveQuestion(newQuestion))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(newQuestion)