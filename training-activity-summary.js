import './components/activity-event-assignment-graded.js';
import './components/activity-event-assignment-overdue.js';
import './components/activity-event-quiz-posted.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivitySummaryEntity } from './src/ActivitySummaryEntity.js';
import { AssignmentGradedEntity } from './src/AssignmentGradedEntity.js';
import { AssignmentOverdueEntity } from './src/AssignmentOverdueEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { LocalizeTrainingActivitySummaryMixin } from './mixins/training-activity-summary-lang-mixin.js';
import { QuizPostedEntity } from './src/QuizPostedEntity.js';

class TrainingActivitySummary extends LocalizeTrainingActivitySummaryMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			sortedActivityEvents: { type: Array },
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
		`;
	}

	constructor() {
		super();
		this._setEntityType(ActivitySummaryEntity);
		this.sortedActivityEvents = [];
	}

	render() {
		return html`
			<div>${this._renderEvents()}</div>
		`;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivitySummaryChange(entity);
		}

		super._entity = entity;
	}

	_onActivitySummaryChange(activitySummary) {
		if (activitySummary) {
			this.sortedActivityEvents = activitySummary.getSortedActivityEvents();
		}
	}

	_renderEventElement(eventEntity) {
		if (!(eventEntity && eventEntity.class && eventEntity.links)) {
			return html``;
		}

		const itemLinkHref = eventEntity.getLinkByRel('item').href;

		if (eventEntity.class.includes(AssignmentGradedEntity.class)) {
			return html`
				<activity-event-assignment-graded
					.href=${itemLinkHref}
					.token=${this.token}
				>
				</activity-event-assignment-graded>
			`;
		} else if (eventEntity.class.includes(AssignmentOverdueEntity.class)) {
			return html`
				<activity-event-assignment-overdue
					.href=${itemLinkHref}
					.token=${this.token}
				>
				</activity-event-assignment-overdue>
			`;
		} else if (eventEntity.class.includes(QuizPostedEntity.class)) {
			return html`
				<activity-event-quiz-posted
					.href=${itemLinkHref}
					.token=${this.token}
				>
				</activity-event-quiz-posted>
			`;
		} else {
			return html``;
		}
	}

	_renderEvents() {
		if (!this.sortedActivityEvents || this.sortedActivityEvents.length === 0) {
			return html`${this.localize('summary:empty:message')}`;
		}

		return this.sortedActivityEvents.reduce(
			(eventsHtml, eventEntity) => html`${eventsHtml}${this._renderEventElement(eventEntity)}`,
			html``
		);
	}
}
customElements.define('training-activity-summary', TrainingActivitySummary);
