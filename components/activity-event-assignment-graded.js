import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentGradedEntity } from '../src/AssignmentGradedEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeTrainingActivitySummaryMixin } from '../mixins/training-activity-summary-lang-mixin.js';

class ActivityEventAssignmentGraded extends LocalizeTrainingActivitySummaryMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			_assignmentTitle: { type: String },
			_grade: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(AssignmentGradedEntity);
		this._assignmentTitle = '';
		this._grade = '';
	}

	render() {
		return html`ey you got graded lmao check it ${this._assignmentTitle} ${this._grade}`;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentGradedChanged(entity);
		}

		super._entity = entity;
	}

	_onAssignmentGradedChanged(assignmentGraded) {
		if (assignmentGraded) {
			this._assignmentTitle = assignmentGraded.assignmentTitle();
			this._grade = assignmentGraded.grade();
		}
	}
}
customElements.define('d2l-labs-activity-event-assignment-graded', ActivityEventAssignmentGraded);
