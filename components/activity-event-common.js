import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEventEntity } from '../src/ActivityEventEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { formatDateTimeFromTimestamp } from '@brightspace-ui/intl/lib/dateTime.js';
import { LocalizeTrainingActivitySummaryMixin } from '../mixins/training-activity-summary-lang-mixin.js';

class ActivityEventCommon extends LocalizeTrainingActivitySummaryMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			courseTitle: { type: String },
			eventDateTime: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				border: 2px solid var(--d2l-color-tungsten);
				border-radius: 6px;
				display: flex;
				margin: 1rem;
				padding: 1rem;
			}
			:host([hidden]) {
				display: none;
			}
			#icon-slot {
				padding-right: 0.5rem;
			}
			:host([dir=rtl]) #icon-slot {
				padding-left: 0.5rem;
				padding-right: 0;
			}
			#info-container {
				display: flex;
				flex: 1;
				flex-direction: column;
			}
			#info-header {
				color: var(--d2l-color-galena);
				display: flex;
				font-size: 0.8rem;
				justify-content: space-between;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(ActivityEventEntity);
		this.courseTitle = '';
		this.eventDateTime = '';
	}

	render() {
		return html`
			<div id="icon-slot">
				<slot name="icon"></slot>
			</div>
			<div id="info-container">
				<div id="info-header">
					<div>${this.courseTitle}</div>
					<div>${this.eventDateTime}</div>
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
			this.courseTitle = activityEvent.courseTitle();
			this.eventDateTime = formatDateTimeFromTimestamp(activityEvent.timestamp(), { format: 'medium' });
		}
	}
}
customElements.define('activity-event-common', ActivityEventCommon);
