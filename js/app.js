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
		$('img').hide();
		$('.' + self.name).show();
		
	});

	self.imgTag.on('click', function() {
		self.counter++;
		console.log(self.name + ' clicks: ' + self.counter);
	});

	self.hideCat = function() {
		$('.' + this.name).hide();
	}
}

//generate cats
(function() {
	for (let i = 0; i < CAT_IMAGES.length; i++) {
		let cat = new Cat(CAT_NAMES[i], CAT_IMAGES[i]);
		$('#cat-list').append(cat.listItem);
		$('#cat-display').append(cat.imgTag);
		cat.hideCat();
	}
}());



//function for cat to hide itself so that another entity can tell it what to do?

//Cat collection to hold instances of the cats and can tell all the cats to hide itself





















