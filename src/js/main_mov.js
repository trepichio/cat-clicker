document.addEventListener("DOMContentLoaded", function () {
	var model = {
		init: function(){
			//initializes cats and store them in localStorage
			var catNames = [
				'Stuart','Galileo','José','Sofia','Pink'
			];
			var data = [];
			this.currentCatIndex = 0;

			if (!localStorage.cats){
				catNames.forEach(function(catStr){
					data.push({
						name: catStr,
						clickCount: 0					
					});
				});
				localStorage.cats = JSON.stringify(data);
			}	

		},

		// obtain the current cat's index from the array sorted by octupus
		getCurrentCatIndex: function(){
			return this.currentCatIndex;
		},

		// changes the value of currentCatIndex 
		setCurrentCat: function(i){
			this.currentCatIndex = i;
		},

		//gets cats from localStorage, then map them to find index of selected cat
		//then increment clickCount of it and store all cats back with the changes
		setSelectedCatCount: function(obj){
			var data = JSON.parse(localStorage.cats)
			var pos = data.map(function(e) { return e.name; }).indexOf(obj.name);
			++data[pos].clickCount;
			localStorage.cats = JSON.stringify(data);
		},

		// gets all cats stored as they are
		getAllCats: function(){
			return JSON.parse(localStorage.cats);
		}
	};

	var octupus = {
		// gets current cat's object from the sorted array
		getSelectedCat: function () {
			return this.getCats()[model.getCurrentCatIndex()];
		},

		// gets index of current cat
		getSelectedCatIndex: function(){
			return model.getCurrentCatIndex();
		},

		// selects another cat by changing current cat's value
		SelectCat: function(n){
			model.setCurrentCat(n);
		},

		// gets an array of objects sorted by cat's names
		getCats: function(){
			return model.getAllCats().sort(function(a, b){
			    if(a.name < b.name) return -1;
			    if(a.name > b.name) return 1;
			    return 0;
			});
		},

		// gets current cat and increments a new value for cat.clickCount
		updateClickCount: function(){
			var cat = octupus.getSelectedCat();
			model.setSelectedCatCount(cat);
		},

		// initializes model and views
		init: function(){
			model.init();
			viewList.init();
			viewDisplay.init();
		}
	};


	var viewList = {
		// initializes view of cat's name list and adds click event on each name to update
		// the data displayed on image-container (picture, name, clicks) and on sidebar (selected cat) 
		init: function () {
			this.catList = document.querySelector('.listCats');
			this.cats = octupus.getCats();
			var data = this.cats;
			viewList.render();

			data.forEach(function (cat) {
				var i = data.indexOf(cat);
				var $item = document.querySelector('#item-'+i);
				
				$item.addEventListener('click', (function (catCopy,n) {
					return function(){
						octupus.SelectCat(n);
						viewList.update(this);
					};
				})(cat,i));
			 });
		},

		// cleans the style of previous selected cat and highlights the chosen one 
		update: function(self){
			document.querySelector('.selected').className = '';
			self.className = 'selected';
			viewDisplay.render();
		},

		// renders the names on the list and highlights the initialized cat
		render: function(){
			var i = octupus.getSelectedCatIndex();
			var htmlStr = '';
			var data = this.cats;
			data.forEach(function (cat) {
					htmlStr +=  '<li id="item-'+ data.indexOf(cat) + '">'+cat.name+'</li>';
			});
			this.catList.innerHTML =  htmlStr;
			document.querySelector('#item-'+i).className = 'selected';
		}
	};

	var viewDisplay = {
		// initializes the view of display area and adds a click event on the picture shown
		// which increments the counter of selected cat
		init: function(){
			var i = octupus.getSelectedCatIndex();
			this.displayPictureArea = document.querySelector('.img-container');
			this.displayCounterArea = document.querySelector('.click-counter');
			viewDisplay.render();
				
			this.displayPictureArea.addEventListener('click', function () {
				octupus.updateClickCount();
				viewDisplay.render();
			});

		},

		// renders the display area with the picture,name and clicks of the selected cat
		render: function(){
			var i = octupus.getSelectedCatIndex();
			var cat = octupus.getSelectedCat();
			var picture = '<img class="img" src="src/img/cat_'+ i +'.jpg">';
			
			this.displayPictureArea.innerHTML = picture;
			this.displayPictureArea.id = "pic-" + i;
			this.displayCounterArea.id = "counter-" + i;
			this.displayCounterArea.textContent = cat.name + " - No. Clicks: " + cat.clickCount;

		}
	};

	// initializes the app
	octupus.init();
}, false);