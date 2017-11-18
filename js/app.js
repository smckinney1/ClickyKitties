$(function() {
	var model = {
		init: function () {
			this.generateCats();
			this.modifyCatPrototype();
		},

		//Simulating a data request
		catCollection: [
			{
				"name": "Wepsi",
				"imgSrc": "img/catphoto.jpg"
			},
			{
				"name": "Cuddles",
				"imgSrc": "img/catphoto2.jpg"
			},
			{
				"name": "Kitty",
				"imgSrc": "img/catphoto3.jpg"
			},
			{
				"name": "Pepsi",
				"imgSrc": "img/catphoto4.jpg"
			},
			{
				"name": "CutiePie",
				"imgSrc": "img/catphoto5.jpg"
			}
		],

		//Used to store the cat objects created from CatModel class
		kittyObjects: [],

		CatModel: function(name, imgSrc) {
			let self = this;
			self.name = name;
			self.counter = 0;
			self.imgSrc = imgSrc;
		},

		//Add click handler to prototype of CatModel, which increases the click counter on that cat's display
		modifyCatPrototype: function() {
			this.CatModel.prototype.clickyKitty = function() {
				this.counter++;
				octopus.updateCatDisplayDiv(this);
			}
		},

		//Generates the cats from CatModel class and pushes them to kittyObjects array to be used later
		generateCats: function() {
			model.catCollection.forEach(function(data) {
				var kitty = new model.CatModel(data.name, data.imgSrc);
				model.kittyObjects.push(kitty);
			});
		}

	};

	var octopus = {
		init: function () {
			model.init();
			catListView.init();
			catDisplayView.init();
		},

		//Allows us to loop over all of the cat objects
		getAllKitties: function () {
			return model.kittyObjects;
		},

		//Add the list item to the cat object and add click handler to the list item
		updateCatListItem: function (data, li) {
			data.listItem = li;
			data.listItem.click(function(e) { 
				catDisplayView.displayCatDiv(data);
			});
		},

		//Add display div to cat object and attach click handler
		updateCatDisplayData: function (data, div) {
			data.catDisplayDiv = div;
			data.catDisplayDiv.click(function(e) {
				data.clickyKitty();
			});
		},

		//Update counter in the display
		updateCatDisplayDiv: function(data) {
			catDisplayView.updateCatCounter(data);
		}
	};

	var catListView = {
		init: function () {
			this.render();
		},

		//Generate all of the cat list items, then update the octopus so that the model can include that list item in its object data
		render: function() {
			var htmlStr = '';
			octopus.getAllKitties().forEach(function(data) {
				htmlStr = $('<li>' + data.name + '</li>');
				$('#cat-list').append(htmlStr);
				octopus.updateCatListItem(data, htmlStr);
			});
		}
	};

	var catDisplayView = {
		init: function () {
			this.render();
		},

		//Generate all of the cat display HTML, then update the octopus so that the model can include the HTML object in its object data
		//Hide all of the generated divs upon render
		render: function() {
			var htmlStr = '';
			octopus.getAllKitties().forEach(function(data) {
				htmlStr = $('<div class="kitty"><h1>' + data.name + '</h1><figure><img src="' + data.imgSrc + '"><figcaption>Click Count: <span>0</span></figcaption></figure></div>');
				$('#cat-display').append(htmlStr);
				octopus.updateCatDisplayData(data, htmlStr);
				catDisplayView.hideKittyDivs();
			});
		},

		hideKittyDivs: function() {
			$('.kitty').hide();
		},

		displayCatDiv: function(data) {
			catDisplayView.hideKittyDivs();
			data.catDisplayDiv.show();
		},

		updateCatCounter: function(data) {
			data.catDisplayDiv.find('span').text(data.counter);
		}
	};

	octopus.init();

});