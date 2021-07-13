import { ActivityEventEntity } from './ActivityEventEntity';
import { Entity } from 'siren-sdk/src/es6/Entity';

export class ActivitySummaryEntity extends Entity {
	static get class() { return 'activity-summary'; }

	/**
	 * @returns {Array} array of activity-event subentities sorted by timestamp
	 */
	getSortedActivityEvents() {
		const activityEvents = this._entity && this._entity.getSubEntitiesByClass(ActivityEventEntity.class);
		return activityEvents && activityEvents.sort(this._activityEventSortFunction);
	}

	/**
	 * @param {object} event1 first event to compare
	 * @param {object} event2 second event to compare
	 * @returns {boolean} whether or not event 1 comes before event 2
	 */
	_activityEventSortFunction(event1, event2) {
		const timestamp1 = event1 && event1.properties && event1.properties.timestamp;
		const timestamp2 = event2 && event2.properties && event2.properties.timestamp;

		return timestamp1 < timestamp2;
	}
}
