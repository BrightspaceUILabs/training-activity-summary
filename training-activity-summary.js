import './components/activity-event-assignment-graded.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivitySummaryEntity } from './src/ActivitySummaryEntity.js';
import { AssignmentGradedEntity } from './src/AssignmentGradedEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { LocalizeTrainingActivitySummaryMixin } from './mixins/training-activity-summary-lang-mixin.js';

class TrainingActivitySummary extends LocalizeTrainingActivitySummaryMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			_sortedActivityEvents: { type: Array },
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
		this._setEntityType(ActivitySummaryEntity);
		this._sortedActivityEvents = [];
	}

	render() {
		return html`${this._renderEvents()}`;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivitySummaryChange(entity);
		}

		super._entity = entity;
	}

	_onActivitySummaryChange(activitySummary) {
		if (activitySummary) {
			this._sortedActivityEvents = activitySummary.getSortedActivityEvents();
		}
	}

	_renderEventElement(eventEntity) {
		if (!(eventEntity && eventEntity.class && eventEntity.links)) {
			return html``;
		}

		debugger; //eslint-disable-line
		const selfLinkHref = eventEntity.getLinkByRel('self').href;

		if (eventEntity.class.includes(AssignmentGradedEntity.class)) {
			return html`
				<d2l-labs-activity-event-assignment-graded
					.href=${selfLinkHref}
					.token=${this.token}
				>
				</d2l-labs-activity-event-assignment-graded>
			`;
		} else {
			return html``;
		}
	}

	_renderEvents() {
		if (!this._sortedActivityEvents || this._sortedActivityEvents.length === 0) {
			return html`${this.localize('summary:empty:message')}`;
		}

		return this._sortedActivityEvents.reduce(
			(eventsHtml, eventEntity) => eventsHtml + this._renderEventElement(eventEntity),
			html``
		);
	}
}
customElements.define('d2l-labs-training-activity-summary', TrainingActivitySummary);
