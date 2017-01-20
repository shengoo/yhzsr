import {AsyncStorage,Alert} from 'react-native';
import {EventEmitter} from 'events';

import dispatcher from '../dispatcher';
import {CREATE_HISTORY_ITEM,DELETE_HISTORY_ITEM} from '../constants';


class SearchStore extends EventEmitter{
    constructor(){
        super();

        this.history = [
            'a','b'
        ];

        AsyncStorage.getItem('q',(error, result)=>{
            let arr = [];
            if(result){
                arr = JSON.parse(result);
            }
            this.history = arr;
            // Alert.alert(JSON.stringify(this.history))
            this.emit('change');
        })

    }

    getAll(){
        // Alert.alert(JSON.stringify(this.history))
        return this.history;
    }

    createItem(q){
        try {
            AsyncStorage.getItem('q',(error, result)=>{
                let arr = [];
                if(result){
                    arr = JSON.parse(result);
                }
                arr.unshift(q);
                this.history = arr;
                const data = JSON.stringify(arr);
                AsyncStorage.setItem('q',data,(error)=>{

                })
                this.emit('change');
            })
        } catch (error) {
            // Error retrieving data
            // Alert.alert(error)
        }
    }

    deleteItem(q){
        var index = this.history.findIndex(item=>item === q);
        if(index > -1){
            this.history.splice(index,1);
            const data = JSON.stringify(this.history);
            AsyncStorage.setItem('q',data,(error)=>{

            })
            this.emit('change');
        }
    }

    handleActions(action){
        // console.log('TodoStoer received an action', action);
        switch (action.type){
            case CREATE_HISTORY_ITEM:{
                this.createItem(action.q);
                break;
            }
            case DELETE_HISTORY_ITEM:{
                this.deleteItem(action.q);
                break;
            }
            default:
                break;
        }
    }

}

const searchStore = new SearchStore();
dispatcher.register(searchStore.handleActions.bind(searchStore));


export default searchStore;