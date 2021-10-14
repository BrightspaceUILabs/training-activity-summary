import './activity-event-common.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeTrainingActivitySummaryMixin } from '../mixins/training-activity-summary-lang-mixin.js';
import { QuizPostedEntity } from '../src/QuizPostedEntity.js';

class ActivityEventQuizPosted extends LocalizeTrainingActivitySummaryMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			quizTitle: { type: String },
			dueDate: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			#due-date-detail {
				border: 2px solid var(--d2l-color-primary-accent-indicator);
				border-radius: 10px;
				color: var(--d2l-color-primary-accent-indicator);
				display: inline-block;
				font-size: 0.8rem;
				padding: 2px;
			}
			.description: {
				font-size: 2rem;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(QuizPostedEntity);
		this.quizTitle = '';
		this.dueDate = '';
	}

	render() {
		return html`
			<activity-event-common
				.href=${this.href}
				.token=${this.token}
			>
				<div slot="icon"><d2l-icon icon="tier3:quizzing"></d2l-icon></div>
				<div slot="description">${this.localize('quiz:posted:description', 'quizTitle', this.quizTitle)}</div>
				<div slot="details">
					<div id="due-date-detail">${this.localize('quiz:posted:duedate', 'dueDate', this.dueDate)}</div>
				</div>
			</activity-event-common>
		`;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onQuizPostedChanged(entity);
		}

		super._entity = entity;
	}

	_onQuizPostedChanged(quizPosted) {
		if (quizPosted) {
			this.quizTitle = quizPosted.quizTitle();
			this.dueDate = quizPosted.dueDate();
		}
	}
}
customElements.define('activity-event-quiz-posted', ActivityEventQuizPosted);
