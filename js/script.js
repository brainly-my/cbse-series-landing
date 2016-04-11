(function($, _) {

	var $search = $('#search');
	var $questionList = $('#questionList');
	var $questionListElements;

	var $template = _.template('<li class="animated fadeInUpBig json-question"><%= content %><div class="json-answer--wrapper json-answer--hidden"><a href="<%= link %>" class="json-link" target="_blank"><h3 class="json-header">Click for more</h1><p class="json-answer"><%= answer %></p></a></div></li>');

	function renderQuestions(questions) {
		var $fragment = $(document.createDocumentFragment());

		questions.forEach(function(question) {
			$fragment.append($template({
				content: question.content,
				link: question.link,
				answer: question.answer
			}));
		});

		$questionList.append($fragment);

		$questionListElements = $questionList.children('li');
		$questionListElements.on('click', onQuestionClick);
		showFirstAnswer();
	}

	function displayMatches(event) {
		var phrase = event.currentTarget.value.toLowerCase();

		$.each($questionList.children(), function(key, value) {
			var $question = $(value);
			var content = $question.html();

			if (content.toLowerCase().indexOf(phrase) >= 0 ) {
				$question.show();
			} else {
				$question.hide();
			}
		});
	}

	function onQuestionClick() {
			var $answer = $(this).find('.json-answer--wrapper');
			var	$question = $(this);

			$questionListElements.find('.json-answer--wrapper').slideUp(700);
			$answer.slideDown(700);

			function toggleColor() {
				if ($("li").hasClass('js-li--blue')) {
					$('li').removeClass('js-li--blue');
				}
			}
			toggleColor();
			$question.toggleClass('js-li--blue');
	}

	function showFirstAnswer() {
		var $header = $('li').first();

		$questionListElements.first().find('.json-answer--wrapper').show();
		$header.addClass('js-li--blue');
	}


	$.getJSON( "questions.json", renderQuestions);
	$search.on('keyup', _.debounce(displayMatches, 200));



})(window.$, window._);
