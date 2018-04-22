((win, $) => {
	function RedCircle() {};

	RedCircle.prototype.create = function() {
		this.item = $('<div class="circle"></div>');
		return this;
	};

	function BlueCircle() {};

	BlueCircle.prototype.create = function() {
		this.item = $('<div class="circle" style="background: blue"></div>'); 
		return this;
	};
	
	function CircleFactory() {
		this.types = {};
		this.create = (type) => {
			return new this.types[type]().create();
		};
		this.register = function(type, cls) {
			if (cls.prototype.create) {
				this.types[type] = cls;
			}
		};
	};

	const CircleGeneratorSingleton = (() => {
		let instance;

		const init = () => {
			let _aCircle = [],
				_stage = $('.advert'),
				_cf = new CircleFactory();
				_cf.register('red', RedCircle);
				_cf.register('blue', BlueCircle);

			const _position = (circle, left, top) => {
				circle.css('left',left);
				circle.css('top',top);
			};

			const create = (left, top, type) => {
				var circle = _cf.create(type).item;
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
			let circle = cg.create(e.pageX - 25, e.pageY - 25, 'red');
			cg.add(circle);
		});

		$(document).keypress(function(e) {
			if (e.key === 'a') {
				let cg = CircleGeneratorSingleton.getInstance();
				let circle = cg.create(Math.floor(Math.random() * 600), e.pageY - 25, 'blue');

				cg.add(circle);
			}
		});
	});

})(window, $);