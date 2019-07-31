import { getInitialData } from '../utils/api'
import { receiveUsers, voteUser, addQuestion } from '../actions/users'
import { receiveQuestions, saveQuestion, voteQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import history from '../utils/history'

const AUTHED_ID = null

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}

export function handleAddQuestion(newQuestion) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        return _saveQuestion({
            question: newQuestion,
            optionOneText: newQuestion.optionOne.text,
            optionTwoText: newQuestion.optionTwo.text,
            author: authedUser,
        })
            .then((newQuestion) => {
                dispatch(saveQuestion(newQuestion))
                dispatch(addQuestion(authedUser, newQuestion.id))
                history.push('/')
            })
    }
}

export function handleAnswer(id, vote) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        return _saveQuestionAnswer({
            authedUser: authedUser,
            id: id,
            answer: vote,
        })
            .then(() => {
                dispatch(voteQuestion(authedUser, id, vote))
                dispatch(voteUser(authedUser, id, vote))
            })
    }
}