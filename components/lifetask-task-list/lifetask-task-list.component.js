/* global angular, firebase, importStyle*/

importStyle('components/lifetask-task-list/lifetask-task-list.css', {preload: true});

class LifetaskTaskList{
	constructor(){
		this.templateUrl = 'components/lifetask-task-list/lifetask-task-list.html';
		this.bindings = {};
		this.controller = LifetaskTaskListController;
	}
}

class LifetaskTaskListController {
	static get $inject() {return ['$element', '$ngRedux'];}

	constructor($element, $ngRedux){
		Object.assign(this, {$: $element[0],$ngRedux});

		this.__lifetaskBehavior = $ngRedux.connect(behavior => Object({
			session: behavior.session,
			task: behavior.task,
			reward: behavior.reward
		})
		)(this);
	}

	/* Lifecycle */ 
	$onInit() { 
		

	}

	$onDestroy() { }
	/* */

	/* Public */
	
	}
	/* */

	/* Private */
	/* */

	/* Protected */
	/* */

	/* Observer */
	/* */
}

angular.module('LifeTask').component('lifetaskTaskList', new LifetaskTaskList ());