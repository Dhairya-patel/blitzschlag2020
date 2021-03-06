import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const logAction = (store)=>{
    return (next) => {
        return (action)=> {
            // console.log('Dispatching: '+JSON.stringify(action));
            const result = next(action);
            // console.log('New State: ' + JSON.stringify(store.getState()))
            return result;
        }
    }
}

let store = createStore(reducer, applyMiddleware(thunk));

export default store;