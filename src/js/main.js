document.addEventListener( "DOMContentLoaded", function() {
	var Cats = ['Stuart','Galileo'];

	for (var i=0; i < Cats.length; i++){
		var img = document.createElement('IMG');
		img.src = 'src/img/cat_'+i+'.jpg';
		img.setAttribute('class', 'img');

		var $imgDiv = document.createElement('DIV');
		$imgDiv.className = 'img-container';
		$imgDiv.appendChild(img);

		var $clickCount = document.createElement('DIV');
		$clickCount.className = 'click-counter';
		$clickCount.id = "counter_"+ i;
		$imgDiv.appendChild($clickCount);

		document.querySelector('.main-container').appendChild($imgDiv);
		var clicks = 0;

		$imgDiv.addEventListener('click', (function (c,i) {
			
			return function(){
				var text = "No. Clicks: " + c++;
				document.querySelector('#counter_'+i)
					.innerHTML = text;
			}
		})(clicks,i), false);
	}

}, false);
