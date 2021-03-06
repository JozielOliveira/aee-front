import { VALUE_CHANGED, RESET_FORM, SUGGESTION, FORM_QUESTION } from '../constants/Avaliation'
import service from '../../services/avaliation'
import { alertError, alertSuccess } from './alert'

export const formQuestion = {
    changeValue : e =>  ({ type : FORM_QUESTION.VALUE_CHANGED_OPTION, payload : { name : e.name , data : e.value }}),
    saveForm : e => ({ type : FORM_QUESTION.SAVE_QUESTION, payload : e }),
    addOption : e => ({ type : FORM_QUESTION.ADD_OPTION, payload : e }),
    removeOption : e => ({ type : FORM_QUESTION.REMOVE_OPTION, payload : e }),
}
export const suggestion = {
    changeValue : payload =>  ({ type : SUGGESTION.VALUE_CHANGED_SUGESTION, payload }),
    changeValueSugestion :  payload => ({ type : SUGGESTION.VALUE_CHANGED_ITEM_SUGESTION, payload }),
    changeKeyDown : payload => ({ type : SUGGESTION.VALUE_CHANGED_KEY_DOWN_SUGESTION, payload }),
    removeItemSuggestion : payload =>({ type : SUGGESTION.REMOVE_ITEM_SUGGESTION, payload }),
}
export const changeValueTEXT = ({ name , value }) =>  ({ type : VALUE_CHANGED, payload : { name , value } })

export const calcelAvaliation = () => ({ type : RESET_FORM })

export const saveAvaliation = (title, description, questions, score, target_audience) => async dispatch => {
    const avaliation = {
        title,
        description,
        questions : { arr : questions},
        score,
        target_audience : { arr: target_audience},
        createProfessional : localStorage.getItem('user')
    }
    const { error } = await service.create(avaliation, dispatch)
    if (error) {
        dispatch(alertError(error))
        return false
    } else {
        dispatch(alertSuccess('Avaliação criado com sucesso'))
        dispatch({ type : RESET_FORM })
        return true
    }
}

export const updateAvaliation = (id, title, description, questions, score, target_audience) => async dispatch => {
    const avaliation = {
        id,
        title,
        description,
        questions : { arr : questions },
        score,
        target_audience : { arr: target_audience},
        updateProfessional : localStorage.getItem('user')
    }
    const { error } = await service.updateItem(avaliation, dispatch)
    if (error) {
        dispatch(alertError(error))
        return false
    } else {
        dispatch(alertSuccess('Avaliação atualizada com sucesso'))
        dispatch({ type : RESET_FORM })
        return true
    }
}
