// var counter = 0;
// var cat = document.getElementById('cat');
// cat.addEventListener('click', function() {
// 	counter++;
// 	console.log(counter);
// });

//Changing requirements. Now two cat pictures.

/*var Cat = function(name, imgSrc) {
	var self = this;
	self.counter = 0;
	self.name = name;
	self.imgSrc = imgSrc;
	self.imgHTMLNode = document.createElement('img')
	self.imgHTMLNode.addEventListener('click', function() {
		self.counter++;
		console.log(self.name + ' clicks: ' + self.counter);
	});
}

var container = document.getElementById('container');
var joe = new Cat('Joe', 'http://placekitten.com/g/500/300');
var jake = new Cat('Jake', 'http://placekitten.com/g/500/300');

joe.imgHTMLNode.setAttribute('src', joe.imgSrc);
jake.imgHTMLNode.setAttribute('src', jake.imgSrc);

container.appendChild(joe.imgHTMLNode);
container.appendChild(jake.imgHTMLNode);*/

//Now 5 cat pictures

const CAT_IMAGES = ['img/catphoto.jpg', 'img/catphoto2.jpg', 'img/catphoto3.jpg', 'img/catphoto4.jpg', 'img/catphoto5.jpg'];
const CAT_NAMES = ['Wepsi', 'Cuddles', 'Kitty', 'Pepsi', 'CutiePie'];

function Cat (name, imgSrc) {
	let self = this;
	self.counter = 0;
	self.name = name;
	self.listItem = $('<li>' + self.name + '</li>');
	self.imgSrc = imgSrc;
	self.imgTag = $('<img class="' + self.name + '" src="' + imgSrc + '">')

	self.listItem.on('click', function(e) {

		$('.' + self.name).removeClass('no-display');
		
	});

	self.imgTag.on('click', function() {
		self.counter++;
		console.log(self.name + ' clicks: ' + self.counter);
	});
}

//generate cats
(function() {
	for (let i = 0; i < CAT_IMAGES.length; i++) {
		let cat = new Cat(CAT_NAMES[i], CAT_IMAGES[i]);
		$('#cat-list').append(cat.listItem);
		$('#cat-display').append(cat.imgTag);
		$('.' + cat.name).addClass('no-display');
	}
}());



























