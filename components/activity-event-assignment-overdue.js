import './activity-event-common.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentOverdueEntity } from '../src/AssignmentOverdueEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeTrainingActivitySummaryMixin } from '../mixins/training-activity-summary-lang-mixin.js';

class ActivityEventAssignmentOverdue extends LocalizeTrainingActivitySummaryMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			assignmentTitle: { type: String },
			endDate: { type: String }
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
			#end-date-detail {
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
		this._setEntityType(AssignmentOverdueEntity);
		this.assignmentTitle = '';
		this.endDate = '';
	}

	render() {
		return html`
			<activity-event-common
				.href=${this.href}
				.token=${this.token}
			>
				<div slot="icon"><d2l-icon icon="tier3:alert"></d2l-icon></div>
				<div slot="description">${this.localize('assignment:overdue:description', 'assignmentTitle', this.assignmentTitle)}</div>
				<div slot="details">
					<div id="end-date-detail">${this.localize('assignment:overdue:endDate', 'endDate', this.endDate)}</div>
				</div>
			</activity-event-common>
		`;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentOverdueChanged(entity);
		}

		super._entity = entity;
	}

	_onAssignmentOverdueChanged(assignmentOverdue) {
		if (assignmentOverdue) {
			this.assignmentTitle = assignmentOverdue.assignmentTitle();
			this.endDate = assignmentOverdue.endDate();
		}
	}
}
customElements.define('activity-event-assignment-overdue', ActivityEventAssignmentOverdue);
