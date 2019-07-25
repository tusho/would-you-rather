export const RECEIVE_USERS = 'RECEIVE_USERS'
export const VOTE_USER = 'VOTE_USER'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function voteUser (authedUser, id, vote) {
    return {
        type: VOTE_USER,
        authedUser,
        id,
        vote,
    }
}