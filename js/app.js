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
				catAdminView.hideView();
				catDisplayView.displayCatDiv(data);
			});
		},

		//Add display div to cat object and attach click handler
		updateCatDisplayData: function (data, div) {
			data.catDisplayDiv = div;
			data.catDisplayDiv.find('img').click(function(e) {
				data.clickyKitty();
			});

			//Add click handler to catDisplayDiv admin button
			data.catDisplayDiv.find('#admin-btn').click(function(e) {
				catAdminView.showView(data);
				catAdminView.render(data);
			});
		},

		//Update counter in the display
		updateCatDisplayDiv: function(data) {
			catDisplayView.updateCatCounter(data);
		},

/*		renderNewCatDataInInterface: function(data) {
			//Keep??
		} */
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
		},

		replaceCatNameInList: function(data, oldName) {
			$('li:contains("' + oldName + '")').replaceWith(data.listItem);
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
				htmlStr = $('<div class="kitty"><h1>' + data.name + '</h1><figure><img src="' + data.imgSrc + '"><figcaption>Click Count: <span>' + data.counter + '</span><br><button id="admin-btn">Admin</button></br></figcaption></figure></div>');
				$('#cat-display').append(htmlStr);
				octopus.updateCatDisplayData(data, htmlStr);
				catDisplayView.hideKittyDivs();

				//hide admin display area for now
				$('.admin').hide();
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
		},

		//TODO: probably don't need all of these function parameters
		replaceCatDisplayWithNewData: function(data, oldName) {
			//data.catDisplayDiv = $('<div class="kitty"><h1>' + data.name + '</h1><figure><img src="' + data.imgSrc + '"><figcaption>Click Count: <span>0</span><br><button id="admin-btn">Admin</button></br></figcaption></figure></div>');
			//$('div:contains("' + oldName + '")').replaceWith(data.catDisplayDiv);
		}
	};

	var catAdminView = {
		render: function (data) {
			$('#btn-submit').click(function() {
				catAdminView.submitNewCatData(data);
				catAdminView.hideView();
				$('#btn-submit').off();
			});
		},
		hideView: function() {
			$('.admin').hide();
		},
		showView: function(data) {
			$('.admin').show();
			$('input[name="cat-name"]').val(data.name);
			$('input[name="cat-img"]').val(data.imgSrc);
			$('input[name="cat-counter"]').val(data.counter);
		},
		submitNewCatData: function(data) {
			//TODO: This is breaking the cat data!!!
			//var oldName = data.name;
			data.name = $('input[name="cat-name"]').val();
			data.imgSrc = $('input[name="cat-img"]').val();
			data.counter = $('input[name="cat-counter"]').val();
			data.listItem.text(data.name);
			console.log(model.kittyObjects);
			//catListView.replaceCatNameInList(data, oldName);
			//catDisplayView.replaceCatDisplayWithNewData(data, oldName);*/
		}
	}

	octopus.init();

});