import { Entity } from 'siren-sdk/src/es6/Entity';

export class ActivityEventEntity extends Entity {
	static get class() { return 'activity-event'; }

	/**
	 * @returns {string} title of course that activity occurred in
	 */
	courseTitle() {
		return this._entity && this._entity.properties && this._entity.properties.courseTitle;
	}

	/**
	 * @returns {number} timestamp of when event occurred
	 */
	timestamp() {
		return this._entity && this._entity.properties && this._entity.properties.timestamp;
	}
}
