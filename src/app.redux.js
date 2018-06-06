/* global angular */
angular.module('LifeTask').config([
	'$ngReduxProvider',
	$ngReduxProvider => {
		class SessionReducerState {
			constructor(){
				this.id ='';
				this.name ='';
				this.email ='';
				this.coins = 0;
			}
		}
		function syncWithStorage(state){
			window.localStorage.setItem('sessionState', JSON.stringify(state));
		}
		function getSessionState(){
			const localStorageItem = window.localStorage.getItem('sessionState');
			return localStorageItem ? JSON.parse(localStorageItem) : new SessionReducerState();
		}

		function sessionReducer(state, action){
			if (!state)
				return getSessionState();
			let newState = {};
			switch(action.type){
			case 'LOGIN':
				newState =  Object.assign({}, state,{
					id: action.data.id,
					name: action.data.name,
					email: action.data.email,
				});
				syncWithStorage(newState);
				return newState;
			case 'FINISH_TASK':
				newState = Object.assign({}, state, {
					coins: state.coins + action.data.task.reward
				});
				syncWithStorage(newState);
				return newState;
			default:
				return newState;
			}
		}

		class TaskReducerState {
			constructor(){
				this.task = {id: null, title: null, description: null, reward: null};
				this.list = [{id: 0, title: 'Titulo', description: 'Descrição', reward: 10}];
			}
		}

		function taskReducer(state, action){
			if (!state)
				return new TaskReducerState();
			switch(action.type){
			case 'TASK_CRUD':
				return Object.assign({}, state, {task:action.data.task});
			case 'SAVE_EDIT':
				return Object.assign({}, state, {
					task: {id: null, title: null, description: null, reward: null},
					list: state.list.map(task =>
						task.id == action.data.id ? action.data:task
					)
				});
			case 'FINISH_TASK':
				return Object.assign({}, state, {
					list: state.list.filter(task => task.id != action.data.task.id)
				});
			default:
				return state;
			}
		}
		class RewardReducerState {
			constructor(){
				
				this.list = [{title: 'Titulo', description: 'Descrição', value: 10}];
			}
		}

		function rewardReducer(state, action){
			if (!state)
				return new RewardReducerState();
			switch(action.type){
			default:
				return state;
			}
		}

		$ngReduxProvider.createStoreWith({
			session: sessionReducer,
			task: taskReducer,
			reward: rewardReducer
		});
	}


]);