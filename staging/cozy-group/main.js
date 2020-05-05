var allAnimals = [
  'anteater',     'bear',           'beaver',        'bee',
  'beetle',       'bison',          'black panther', 'butterfly',
  'camel',        'cat',            'cheetah',       'chicken',
  'cougar',       'cow',            'crab',          'crocodile',
  'deer',         'dog',            'dolphin',       'duck',
  'eagle',        'elephant',       'Emu',           'flamingo',
  'fox',          'frog',           'giraffe',       'goat',
  'gorilla',      'guinea pig',     'hamster',       'hedgehog',
  'hippopotamus', 'horse',          'hummingbird',   'jaguar',
  'jellyfish',    'kangaroo',       'kiwi',          'koala',
  'ladybug',      'lemur',          'leopard',       'lion',
  'llama',        'lobster',        'manta ray',     'monkey',
  'mouse',        'octopus',        'orangutan',     'orca',
  'ostrich',      'otter',          'owl',           'panda bear',
  'parrot',       'peacock',        'penguin',       'pig',
  'pigeon',       'platypus',       'polar bear',    'porcupine',
  'Prawn',        'praying mantis', 'puffer fish',   'rabbit',
  'raccoon',      'rat',            'red panda',     'reindeer',
  'rhinoceros',   'salmon',         'scorpion',      'seahorse',
  'seal',         'shark',          'sheep',         'skunk',
  'sloth',        'snail',          'snake',         'spider',
  'squirrel',     'starfish',       'sugar glider',  'swan',
  'tiger',        'toad',           'Tortoise',      'toucan',
  'turkey',       'turtle',         'walrus',        'whale',
  'wolf',         'yak',            'zebra'
]

var themeColors = [
	'#49C9D1',
	'#FFC700',
	'#FF6759',
	'#BFD84F'
]
docReady(function() {
	highlightText()
	navBarSetup()

	window.addEventListener('navigating', function() {
		highlightText()
	})
	alternateColor()
	window.addEventListener('scroll', function (){
		highlightText()
	})
})


var alternateColor = function() {
	var boxImages = document.getElementsByClassName('content-box-image')
	for (let i=0; i< boxImages.length; i++) {
		window.setInterval(function(){
			boxImages[i].style.borderColor = themeColors[Math.floor(Math.random()* themeColors.length)]
		}, 4000)
	}
}

var addAnimalsInSectionContent = function() {
	var allSectionLogos = document.getElementsByClassName('section-logo')
	function addImage (i) {
		var sectionLogo = allSectionLogos[i]
		var animalIndex = Math.floor(Math.random() * allAnimals.length)
		var animal  = allAnimals[animalIndex]
		// Making sure we don't get two same animals
		allAnimals.splice(animalIndex, 1)
		var img = new Image()
		img.onload = function() {
			
			sectionLogo.alt = 'Logo of ' + animal
			sectionLogo.className = 'section-logo'
			sectionLogo.src = img.src
			sectionLogo.classList.add('show')
		}	
		img.src = './assets/images/animal-logos/png/' + animal + '.png'

	}
	for (let i=0; i< allSectionLogos.length; i++) {
		addImage(i)
		
	}
}


var highlightText = function() {
	var highlitables = document.getElementsByClassName('highlight')
	function highlight(target, i) {
		if(isInViewport(target)) {
		// var background = document.createElement('div')
		// background.className = 'highlight-background'
		// background.style.background = themeColors[i%themeColors.length]
		// target.style.position = 'relative'
		// target.style.zIndex = '1'
		

		// target.appendChild(background)
		// if (target.classList.i)
		window.setTimeout(function(){
			if (!target.classList[1]) {
				const backgroundColor =  themeColors[Math.floor(Math.random()* themeColors.length)]
				const backgroundStyle = 'linear-gradient(to right, ' +
				backgroundColor + ',' +
				backgroundColor+ ' 50%, transparent 50%, transparent)'
				target.style.backgroundImage =  backgroundStyle
				target.classList.add('show')
			}
			}
		, Math.random() * 4000)
	}
	}
	for (let i = 0 ; i < highlitables.length; i++) {
		highlight(highlitables[i], i)
	}
}
var navBarSetup = () => {
	var navBar = document.getElementsByTagName('nav')[0]
	var navItems = document.getElementsByClassName('nav-items')[0]

	var menuOpen = false
	navBar.addEventListener('click', function(){
		if (!menuOpen) {
			navItems.classList.add('show')
		} else {
			navItems.classList.remove('show')
		}
		menuOpen = !menuOpen
	})
}

