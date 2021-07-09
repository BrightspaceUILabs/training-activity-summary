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
			.grade-detail{
				padding: 2px;
				display: inline-block;
				border: 2px solid var(--d2l-color-primary-accent-indicator);
				border-radius: 10px;
				color: var(--d2l-color-primary-accent-indicator);
				font-size: 0.8rem;
			}
			.description: {
				font-size: 2rem;
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
		return html`
			<d2l-labs-activity-event-common
				.href=${this.href}
				.token=${this.token}
			>
				<div slot="icon"><d2l-icon icon="tier3:grade"></d2l-icon></div>
				<div slot="description">${this.localize('assignment:graded:description', 'assignmentTitle', this._assignmentTitle)}</div>
				<div slot="details">
					<div class="grade-detail">${this.localize('assignment:graded:grade', 'grade', this._grade)}</div>
				</div>
			</d2l-labs-activity-event-common>
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
			this._assignmentTitle = assignmentGraded.assignmentTitle();
			this._grade = assignmentGraded.grade();
		}
	}
}
customElements.define('d2l-labs-activity-event-assignment-graded', ActivityEventAssignmentGraded);
