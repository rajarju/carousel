	function Cr(){

		this.data = {
			slides: [],
			start: true
		}; // Array of slides to show

		this.loaded = 0;


		this.slides = {
			current : 0
			//next: 
			//prev : 
		};

		this.timer = null;

		this.dim = {};


		this.config = function(data){
			for (var prop in data) { this.data[prop] = data[prop]; }
		}

		this.init = function(){

			console.log('init');

			this.$wait = $('#carrousel .wait');
			

			$('#carrousel .controls a').click(this.bind);
			

			// Start Preload
			this.preload();

		};


		this.bind = function(e){
			e.preventDefault();
			var action = $(this).attr('id');
			_this.action(action)
		}



		this.preload = function(){
			// Load All Images
			for(var i = 0; i < this.data.slides.length ; i++){

				console.log("loading" + i);

				var img = new Image();
				img.src = this.data.slides[i].src;

				var slide = $("<div>",{
						"class" :  "slide"
					});

				slide.append(
					$("<div>" , {
						"class" : "slide-image"
					}).css({
						'background-image' : 'url(' + this.data.slides[i].src + ')'
					})
				);

				slide.append(
					$("<div>", {
						"class" : "slide-text"
					}).text(this.data.slides[i].title)
				);

				//this.$slides.push(slide);
				$(".slides").append(slide);


				img.onload = function(){
					_this.updateLoad();
					console.log("loaded");

				}

			}
		};		

		this.render = function(slideNum){

			if(slideNum < 0)
				slideNum = this.data.slides.length-1;
			if(slideNum >= this.data.slides.length)
				slideNum = 0;


			_this.slides.current = slideNum;
				
			// Get size of the screen
			_this.dim.height = _this.$slides.height();
			this.dim.width = _this.$slides.width();
			// Position slides

			this.$slides.css({left: 0}).removeClass('prev current next');

			this.$slides.eq(slideNum).css({ left: 0}).addClass('current');

			if(slideNum - 1 < 0){
				this.$slides.eq(this.data.slides.length - 1).css({ left: -this.$slides.width()}).addClass('prev');
			}
			else{
				this.$slides.eq(slideNum - 1).css({ left: -this.$slides.width()}).addClass('prev');
			}

			if(slideNum + 1 > _this.data.slides.length - 1){
				this.$slides.eq(0).css({ left: +this.$slides.width()}).addClass('next');
			}
			else{
				this.$slides.eq(slideNum + 1).css({ left: this.$slides.width()}).addClass('next');
			}



		};
		

		this.action = function(action){

			switch(action){
				case 'prev' :
				this.render(this.slides.current - 1);
				 break;
				case 'play' : 
				this.timer = setInterval(function(_this){
					_this.action('next');
				}, 1000, this)
				break;

				case 'pause' : 
				clearTimeout(_this.timer);
				break;

				case 'next' : 
				this.render(this.slides.current + 1);
				break;			
			}


		}




		this.controls = function(action){

		}

		this.updateLoad = function(img){

			// Add slides

			this.loaded++;

			if(this.loaded == this.data.slides.length){
				this.$wait.hide();
				this.$slides = $('#carrousel .slides .slide');
				this.$slides.parent().show();

				this.render(0);
			}
		}


		var _this = this;

	};