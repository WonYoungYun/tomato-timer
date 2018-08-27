//Import
import Sound from 'react-native-sound';

//Action

const START_TIMER = 'START_TIMER';
const RESTART_TIMER = 'RESTART_TIMER';
const ADD_SECONDS = 'ADD_SECONDS';
const sound = new Sound('sounds/analog-watch-alarm_daniel-simion.mp3', Sound.MAIN_BUNDLE, (error) => {
    if(error) {
        console.log('failed to load the sound', error);
        return;
    }
})

//Action Creator

function  startTimer(){
    return {
        type: START_TIMER
    };
}

function restartTimer(){
    return {
        type: RESTART_TIMER
    };
}

function addSecond() {
    return {
        type: ADD_SECONDS
    };
}

//Reducer

const TIMER_DURATION = 1500;

const initialState = {
    isPlaying: false,
    elapsedTime: 0,
    timerDuration: TIMER_DURATION
}

function reducer(state = initialState, action){
    switch(action.type){
        case START_TIMER:
            return applyStartTimer(state, action);
        case RESTART_TIMER:
            return applyRestartTimer(state, action);
        case ADD_SECONDS:
            return applyAddSecond(state);
        default:
            return state;
    }
}


//Reducer Functions

function applyStartTimer(state){
    return {
        ...state, //현재 state에서 새롭게 뒤덮는다.
        isPlaying: true,
        elapsedTime: 0
    };
}

function applyRestartTimer(state){
    return{
        ...state,
        isPlaying: false,
        elapsedTime: 0
    };
}

function applyAddSecond(state){
    if(state.elapsedTime < TIMER_DURATION)
        return{
            ...state,
            elapsedTime: state.elapsedTime + 1
        };
    else {
        return{
            ...state,
            isPlaying:false,
        };
    }
}
//Export Action Creators

const actionCreators = {
    startTimer,
    restartTimer,
    addSecond
}

export{actionCreators};

//Export Reducer

export default reducer;