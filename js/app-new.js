/**https://www.awwwards.com/build-a-simple-javascript-app-the-mvc-way.html**/

$(function () {

	//Not sure where to put this 
	var CatCollection = [
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
	];

	var CatModel = function () {
		this.counter = 0;
		// this.name = '';
		// this.listItem = '';
		// this.imgSrc = '';
		// this.imgTag = '';

	};

	CatModel.prototype = {
		init: function () {
			//do something
			
		},
		clickKitty: function () {
			this.counter++;
		}

	};

	var CatListView = function (CatModel) {

	}

	var model = {

	}

	var view = {
		init: function() {
			//do something
		},
		displayCatList: function() {
			//do stuff with the octopus
		}
	}

	var octopus = {
		init: function() {
			CatModel.init();
			catListView.init();
			catMainView.init();
		},
		getCats: function() {
			CatCollection.forEach(function(e, i) {
				//do something with each cat
			});
		}
	};

	// var catListView = {
	// 	init: function() {
	// 		//some other code
	// 		this.render();
	// 	},
	// 	render: function() {
	// 		//do stuff
	// 	}
	// 	clickKittyListItem: function () {

	// 	}
	// }

	// var catMainView = {

	// }

	octopus.init();
});