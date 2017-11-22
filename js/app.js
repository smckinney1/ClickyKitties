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
			model.catCollection.forEach(function(cat) {
				var kitty = new model.CatModel(cat.name, cat.imgSrc);
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
		updateCatListItem: function (cat, li) {
			cat.listItem = li;
			cat.listItem.click(function(e) {
				catAdminView.hideView();
				catDisplayView.displayCatDiv(cat);
			});
		},

		//Add display div to cat object and attach click handler
		updateCatDisplayData: function (cat, div) {
			cat.catDisplayDiv = div;
			cat.catDisplayDiv.find('img').click(function(e) {
				cat.clickyKitty();
			});

			//Add click handler to catDisplayDiv admin button
			cat.catDisplayDiv.find('#admin-btn').click(function(e) {
				catAdminView.showView(cat);
				catAdminView.render(cat);
			});
		},

		//Update counter in the display
		updateCatDisplayDiv: function(cat) {
			catDisplayView.updateCatCounter(cat);
		}
	};

	var catListView = {
		init: function () {
			this.render();
		},

		//Generate all of the cat list items, then update the octopus so that the model can include that list item in its object data
		render: function() {
			var htmlStr = '';
			octopus.getAllKitties().forEach(function(cat) {
				htmlStr = $('<li>' + cat.name + '</li>');
				$('#cat-list').append(htmlStr);
				octopus.updateCatListItem(cat, htmlStr);
			});
		},

		replaceCatNameInList: function(cat) {
			cat.listItem.text(cat.name);
		}
	};

	var catDisplayView = {
		init: function () {
			this.render();
		},

		//Generate all of the cat display HTML, then update the octopus so that the model can include the HTML object in its object cat
		//Hide all of the generated divs upon render
		render: function() {
			var htmlStr = '';
			octopus.getAllKitties().forEach(function(cat) {
				htmlStr = $('<div class="kitty"><h1>' + cat.name + '</h1><figure><img src="' + cat.imgSrc + '"><figcaption>Click Count: <span>' + cat.counter + '</span><br><button id="admin-btn">Admin</button></br></figcaption></figure></div>');
				$('#cat-display').append(htmlStr);
				octopus.updateCatDisplayData(cat, htmlStr);
				catDisplayView.hideKittyDivs();

				//hide admin display area for now
				$('.admin').hide();
			});
		},

		hideKittyDivs: function() {
			$('.kitty').hide();
		},

		displayCatDiv: function(cat) {
			catDisplayView.hideKittyDivs();
			cat.catDisplayDiv.show();
		},

		updateCatCounter: function(cat) {
			cat.catDisplayDiv.find('span').text(cat.counter);
		},

		renderNewCatDisplayData: function(cat) {
			cat.catDisplayDiv.find('h1').text(cat.name);
			cat.catDisplayDiv.find('span').text(cat.counter);
			cat.catDisplayDiv.find('img').attr('src', cat.imgSrc);

		}
	};

	var catAdminView = {
		render: function (cat) {
			$('#btn-submit').click(function() {
				catAdminView.submitNewCatData(cat);
				catAdminView.hideView();
				$('#btn-submit').off();
			});
		},
		hideView: function() {
			$('.admin').hide();
		},
		showView: function(cat) {
			$('.admin').show();
			$('input[name="cat-name"]').val(cat.name);
			$('input[name="cat-img"]').val(cat.imgSrc);
			$('input[name="cat-counter"]').val(cat.counter);
		},
		submitNewCatData: function(cat) {
			cat.name = $('input[name="cat-name"]').val();
			cat.imgSrc = $('input[name="cat-img"]').val();
			cat.counter = $('input[name="cat-counter"]').val();
			catListView.replaceCatNameInList(cat);
			catDisplayView.renderNewCatDisplayData(cat);
		}
	}

	octopus.init();

});