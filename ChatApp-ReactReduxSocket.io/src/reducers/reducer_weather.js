import {FETCH_WEATHER} from '../actions/index.js'
export default function(state=[], action){
  console.log('Reducer PayLoad :', action);
  switch(action.type){
    case FETCH_WEATHER:
    //  return state.concat(action.payload.data);
      return [action.payload.data, ...state];
    }
return state;
}
