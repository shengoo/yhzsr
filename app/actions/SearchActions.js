import dispatcher from '../dispatcher';

import {CREATE_HISTORY_ITEM,DELETE_HISTORY_ITEM} from '../constants';


export function createItem(q) {
    dispatcher.dispatch({
        type:CREATE_HISTORY_ITEM,
        q
    });
}

export function deleteItem(q) {
    dispatcher.dispatch({
        type:DELETE_HISTORY_ITEM,
        q
    })
}