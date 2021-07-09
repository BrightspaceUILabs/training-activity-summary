import { ActivityEventEntity } from './ActivityEventEntity.js';
import { formatDateTimeFromTimestamp } from '@brightspace-ui/intl/lib/dateTime.js';

export class AssignmentOverdueEntity extends ActivityEventEntity {
	static get class() { return 'assignment-overdue'; }

	/**
	 * @returns {string} title of assignment that is now overdue
	 */
	assignmentTitle() {
		return this._entity && this._entity.properties && this._entity.properties.assignmentTitle;
	}

	/**
	 * @returns {string} end date of assignment
	 */
	endDate() {
		return this._entity
			&& this._entity.properties
			&& formatDateTimeFromTimestamp(this._entity.properties.endDate, { format: 'short' });
	}
}
