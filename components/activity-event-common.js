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
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
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
			<slot name="icon"></slot>
			<div>${this._eventDateTime}</div>
			<slot name="message"></slot>
			<div>${this._courseTitle}</div>
			<slot name="details"></slot>
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
