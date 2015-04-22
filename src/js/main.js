document.addEventListener( "DOMContentLoaded", function() {
	function Cat (i) {
		this.name = catNames[i];
		this.pic = 'src/img/cat_'+ i +'.jpg';
		this.clickCount = 0;
	}

	Cat.prototype.addImage = function() {

		var img = document.createElement('IMG');
		img.src = this.pic;
		img.className = 'img';

		var div = document.createElement('DIV');
		div.className = 'img-container';
		div.setAttribute('id', this.name);
		div.appendChild(img);
		$main.appendChild(div);
	};

	Cat.prototype.addFoot = function() {
		var div = document.createElement('DIV');
		div.className = 'click-counter';
		div.setAttribute('id', 'counter-'+this.name);

		var $imgDiv = document.querySelector('#'+this.name);
		$imgDiv.appendChild(div);

	};

	Cat.prototype.addClick = function() {
		var self = this;
		document.querySelector('#'+self.name)
			.addEventListener('click', function () {
				var text = "No. Clicks: " + ++self.clickCount;
				document.querySelector('#counter-'+self.name)
					.innerHTML = text;
			}, false);
	};

	Cat.prototype.show = function() {
		hideAllCats();
		document.querySelector('#'+this.name).style.display = "";
		document.querySelector('#counter-'+this.name).style.display = "";
	};

	function hideAllCats () {
		var allContainers = document.querySelectorAll('.img-container');
		var allItems = document.querySelectorAll('.listCats li');
		for (var x = 0; x < allContainers.length; x++){
			allContainers[x].style.display = "none";
			allItems[x].style.color = "white";
		}
	}

	var catNames = [
		'Stuart','Galileo','José','Sofia','Pink'
	];
	catNames = catNames.sort();

	var $main = document.querySelector('.main-container');
	var kitten = [];

	for (each in catNames) {
		var li = document.createElement('li');
		li.innerHTML = catNames[each];
		li.id = "item-" + each;
		var $ul = document.querySelector('.listCats');
		$ul.appendChild(li);

		kitten[each] = new Cat(each);
		kitten[each].addImage();
		kitten[each].addFoot();
		kitten[each].addClick();

		li.addEventListener('click',(function (copyEach) {

			return function(){
				kitten[copyEach].show();
				this.style.color = "green";

			};
		})(each));
	}

	hideAllCats();

}, false);
