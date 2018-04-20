((win, $) => {
	const CircleGeneratorSingleton = (() => {
		let instance;

		const init = () => {
			let _aCircle = [],
				_stage = $('.advert');

			const _position = (circle, left, top) => {
				circle.css('left',left);
				circle.css('top',top);
			};

			const create = (left, top) => {
				var circle = $('<div class="circle"></div>');
				_position(circle, left, top);
				return circle;
			};

			const add = (circle) => {
				_stage.append(circle);
				_aCircle.push(circle);
			};

			const index = () => {
				return _aCircle.length;
			};
			
			return { index, create, add };
		};

		return {
			getInstance() {
				if (!instance) {
					instance = init();
				}

				return instance;
			}
		}
	})();

	$(win.document).ready(function(){
		$('.advert').click(function(e){
			let cg = CircleGeneratorSingleton.getInstance();
			let circle = cg.create(e.pageX - 25, e.pageY - 25);
			cg.add(circle);
		});

		$(document).keypress(function(e) {
			if (e.key === 'a') {
				let cg = CircleGeneratorSingleton.getInstance();
				let circle = cg.create(Math.floor(Math.random() * 600), e.pageY - 25);

				cg.add(circle);
			}
		});
	});

})(window, $);