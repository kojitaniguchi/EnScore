import { createActions } from 'redux-actions'
import { SEND_VALUE, REQUEST_IMAGE, SUCCESS_USER, FAILURE_USER } from './actionTypes.jsx'

const actions = createActions(
    {   
        REQUEST_USER_SCORE : () => {return },
        SUCCESS_USER_SCORE : data => data,
        FAILURE_USER_SCORE : erorr => erorr,

        REQUEST_APP_SCORE : param => param,

        REQUEST_USER_RANK : param => param,
        SUCCESS_USER_RANK : data => data,
        FAILURE_USER_RANK : erorr => erorr,

        REQUEST_USER_INFO : () => {return },
        SUCCESS_USER_INFO : data => data,
        FAILURE_USER_INFO : erorr => erorr,

        REQUEST_USER_UPDATE : param => param,
        SUCCESS_USER_UPDATE : data => data,
        FAILURE_USER_UPDATE : erorr => erorr,

        SEND_VALUE : value => value,

    }
)

export default actions

