import { ActivityEventEntity } from './ActivityEventEntity.js';
import { formatDateTimeFromTimestamp } from '@brightspace-ui/intl/lib/dateTime.js';

export class QuizPostedEntity extends ActivityEventEntity {
	static get class() { return 'quiz-posted'; }

	/**
	 * @returns {string} due date of quiz
	 */
	dueDate() {
		return this._entity
			&& this._entity.properties
			&& formatDateTimeFromTimestamp(this._entity.properties.dueDate,  { format: 'short' });
	}
	/**
	 * @returns {string} title of the quiz that is being posted
	 */
	quizTitle() {
		return this._entity && this._entity.properties && this._entity.properties.quizTitle;
	}
}
