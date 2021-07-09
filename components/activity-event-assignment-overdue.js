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
			_assignmentTitle: { type: String },
			_endDate: { type: String }
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
			.end-date-detail{
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
		this._setEntityType(AssignmentOverdueEntity);
		this._assignmentTitle = '';
		this._endDate = '';
	}

	render() {
		return html`
			<d2l-labs-activity-event-common
				.href=${this.href}
				.token=${this.token}
			>
				<div slot="icon"><d2l-icon icon="tier3:alert"></d2l-icon></div>
				<div slot="description">${this.localize('assignment:overdue:description', 'assignmentTitle', this._assignmentTitle)}</div>
				<div slot="details">
					<div class="end-date-detail">${this.localize('assignment:overdue:endDate', 'endDate', this._endDate)}</div>
				</div>
			</d2l-labs-activity-event-common>
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
			this._assignmentTitle = assignmentOverdue.assignmentTitle();
			this._endDate = assignmentOverdue.endDate();
		}
	}
}
customElements.define('d2l-labs-activity-event-assignment-overdue', ActivityEventAssignmentOverdue);
