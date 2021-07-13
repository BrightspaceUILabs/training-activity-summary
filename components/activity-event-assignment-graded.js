import './activity-event-common.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentGradedEntity } from '../src/AssignmentGradedEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeTrainingActivitySummaryMixin } from '../mixins/training-activity-summary-lang-mixin.js';

class ActivityEventAssignmentGraded extends LocalizeTrainingActivitySummaryMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			assignmentTitle: { type: String },
			grade: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			#grade-detail {
				border: 2px solid var(--d2l-color-primary-accent-indicator);
				border-radius: 10px;
				color: var(--d2l-color-primary-accent-indicator);
				display: inline-block;
				font-size: 0.8rem;
				padding: 2px;
			}
			.description: {
				font-size: 2rem;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(AssignmentGradedEntity);
		this.assignmentTitle = '';
		this.grade = '';
	}

	render() {
		return html`
			<activity-event-common
				.href=${this.href}
				.token=${this.token}
			>
				<div slot="icon"><d2l-icon icon="tier3:grade"></d2l-icon></div>
				<div slot="description">${this.localize('assignment:graded:description', 'assignmentTitle', this.assignmentTitle)}</div>
				<div slot="details">
					<div id="grade-detail">${this.localize('assignment:graded:grade', 'grade', this.grade)}</div>
				</div>
			</activity-event-common>
		`;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentGradedChanged(entity);
		}

		super._entity = entity;
	}

	_onAssignmentGradedChanged(assignmentGraded) {
		if (assignmentGraded) {
			this.assignmentTitle = assignmentGraded.assignmentTitle();
			this.grade = assignmentGraded.grade();
		}
	}
}
customElements.define('activity-event-assignment-graded', ActivityEventAssignmentGraded);
