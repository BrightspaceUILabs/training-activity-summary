import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEventEntity } from '../src/ActivityEventEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { formatDateTimeFromTimestamp } from '@brightspace-ui/intl/lib/dateTime.js';
import { LocalizeTrainingActivitySummaryMixin } from '../mixins/training-activity-summary-lang-mixin.js';

class ActivityEventCommon extends LocalizeTrainingActivitySummaryMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			_courseTitle: { type: String },
			_eventDateTime: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				margin: 1rem;
				padding: 1rem;
				border: 2px solid var(--d2l-color-tungsten);
				border-radius: 6px;
				display: flex;
			}
			:host([hidden]) {
				display: none;
			}
			.icon-slot {
				padding-right: 0.5rem;
			}
			:host([dir=rtl]) .icon-slot {
				padding-right: 0;
				padding-left: 0.5rem;
			}
			.info-container {
				display: flex;
				flex-direction: column;
			}
			.info-header {
				display: flex;
				justify-content: space-between;
				font-size: 0.8rem;
				color: var(--d2l-color-galena);
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(ActivityEventEntity);
		this._courseTitle = '';
		this._eventDateTime = '';
	}

	render() {
		return html`
			<div class="icon-slot">
				<slot name="icon"></slot>
			</div>
			<div class="info-container">
				<div class="info-header">
					<div>${this._courseTitle}</div>
					<div class="date-time">${this._eventDateTime}</div>
				</div>
				<slot name="description"></slot>
				<slot name="details"></slot>
			</div>
		`;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityEventChanged(entity);
		}

		super._entity = entity;
	}

	_onActivityEventChanged(activityEvent) {
		if (activityEvent) {
			this._courseTitle = activityEvent.courseTitle();
			this._eventDateTime = formatDateTimeFromTimestamp(activityEvent.timestamp(), { format: 'medium' });
		}
	}
}
customElements.define('d2l-labs-activity-event-common', ActivityEventCommon);
