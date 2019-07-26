export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE_QUESTION = 'VOTE_QUESTION'
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function voteQuestion (authedUser, id, vote) {
    return {
        type: VOTE_QUESTION,
        authedUser,
        id,
        vote,
    }
}

export function saveQuestion (question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}