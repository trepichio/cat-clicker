document.addEventListener( "DOMContentLoaded", function() {
	var img = document.createElement('IMG');
	img.src = 'src/img/kitten_640x426.jpg';
	img.setAttribute('class', 'img');

	var $imgDiv = document.querySelector('.img-container')
	$imgDiv.appendChild(img);

	var $clickCount = document.querySelector('.click-counter');
	var clicks = 0;
	$imgDiv.addEventListener('click', function () {
		var text = "No. Clicks: " + clicks++;
		$clickCount.innerHTML = text;
	}, false);

}, false);
