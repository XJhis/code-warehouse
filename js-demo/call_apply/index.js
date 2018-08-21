function Pet(word) {
	this.word = word;
	this.speak = function() {
		console.log(this.word)
	}
}

function Dog() {
	// Pet('呵呵哒 ') //new Dog() ==> {}无属性的对象
	Pet.call(this, '呵呵哒 ') //new Dog() ==> {word: "呵呵哒 ", speak: ƒn}
 }

//继承

//
