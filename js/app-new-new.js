$(function() {
	var model = {
		init: function () {
			this.generateCats();
			this.modifyCatPrototype();
		},

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

		kittyObjects: [],

		CatModel: function(name, imgSrc) {
			let self = this;
			self.name = name;
			self.counter = 0;
			self.imgSrc = imgSrc;
		},

		modifyCatPrototype: function() {
			this.CatModel.prototype.clickyKitty = function() {
				this.counter++;
				octopus.updateCatDisplayDiv(this);
			}
		},

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

		getAllKitties: function () {
			return model.kittyObjects;
		},

		updateCatListItem: function (data, li) {
			data.listItem = li;
			data.listItem.click(function(e) { 
				catDisplayView.displayCatDiv(data);
			});
		},

		updateCatDisplayData: function (data, div) {
			data.catDisplayDiv = div;
			data.catDisplayDiv.click(function(e) {
				data.clickyKitty();
			});
		},

		updateCatDisplayDiv: function(data) {
			catDisplayView.updateCatCounter(data);
		}
	};

	var catListView = {
		init: function () {
			this.render();
		},

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