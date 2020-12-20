import { useState } from 'react';
import { data } from '../../data';

function Form() {
	const [score, setScore] = useState(0);

	function answerBtnHandle(evt) {
		if (evt.target.attributes.isright.value === `true`) {
			setScore((score) => score + 1);
			evt.target.classList.add('bg-success', 'text-white');
		} else {
			evt.target.classList.add('bg-danger', 'text-white');
		}

		const selectedQuestion = data.find((question) => {
			return question.questionTitle === evt.target.parentNode.id;
		});

		for (let i = 0; i <= selectedQuestion.variants.length; i++) {
			evt.target.parentNode.children[i].disabled = true;
		}
	}

	return (
		<div className='container'>
			<form className='test__form w-75 mx-auto' action='#'>
				<ul className='test__list list-unstyled'>
					{data.map((question, index) => (
						<li
							key={question.questionTitle}
							id={question.questionTitle}
							className='test__list-item list-group mb-5'>
							<h2 className='h5 test__title'>
								{index + 1}. {question.questionTitle}
							</h2>

							{question.variants.map((variant) => (
								<button
									key={question.questionTitle.concat(
										variant.answerTitle
									)}
									disabled={false}
									onClick={answerBtnHandle}
									className='test__variant-btn btn btn-block text-left  list-group-item '
									type='button'
									isright={String(variant.isCorrect)}
									id={variant.answerTitle}
									name='user__choice'>
									{variant.answer}) {variant.answerTitle}
								</button>
							))}
						</li>
					))}
				</ul>
				<h2 className='test__result text-center'>Result:</h2>
				<div className='alert alert-info p-4'>
					<p>
						Your score:
						<strong className='ml-1'>
							{score} / {data.length}
						</strong>
					</p>
					<p className='mb-0'>
						Percentage:
						<strong className='ml-1 '>
							{(score * 100) / data.length}%
						</strong>
					</p>
				</div>
			</form>
		</div>
	);
}

export default Form;
