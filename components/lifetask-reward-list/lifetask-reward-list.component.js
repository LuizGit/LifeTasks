/* global angular, firebase, importStyle*/

importStyle('components/lifetask-reward-list/lifetask-reward-list.css', {preload: true});

class LifetaskRewardList{
	constructor(){
		this.templateUrl = 'components/lifetask-reward-list/lifetask-reward-list.html';
		this.bindings = {};
		this.controller = LifetaskRewardListController;
	}
}

class LifetaskRewardListController {
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

angular.module('LifeTask').component('lifetaskRewardList', new LifetaskRewardList ());