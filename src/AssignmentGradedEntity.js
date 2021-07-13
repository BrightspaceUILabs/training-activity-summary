import { ActivityEventEntity } from './ActivityEventEntity.js';

export class AssignmentGradedEntity extends ActivityEventEntity {
	static get class() { return 'assignment-graded'; }

	/**
	 * @returns {string} title of assignment that was graded
	 */
	assignmentTitle() {
		return this._entity && this._entity.properties && this._entity.properties.assignmentTitle;
	}

	/**
	 * @returns {string} grade received for assignment
	 */
	grade() {
		return this._entity && this._entity.properties && this._entity.properties.grade;
	}
}
