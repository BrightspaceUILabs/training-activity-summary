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

	_activityEventSortFunction(event1, event2) {
		const timestamp1 = event1 && event1.properties && event1.properties.timestamp;
		const timestamp2 = event2 && event2.properties && event2.properties.timestamp;

		return timestamp1 > timestamp2;
	}
}
