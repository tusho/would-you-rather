export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE_QUESTION = 'VOTE_QUESTIONS'

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