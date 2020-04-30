const allAnimals = [
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

const themeColors = [
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


const alternateColor = function() {
	const boxImages = document.getElementsByClassName('content-box-image')
	for (let i=0; i< boxImages.length; i++) {
		window.setInterval(function(){
			boxImages[i].style.borderColor = themeColors[Math.floor(Math.random()* themeColors.length)]
		}, 4000)
	}
}

const addAnimalsInSectionContent = function() {
	const allSections = document.getElementsByClassName('section-content')
	for (let i=0; i< allSections.length; i++) {
		const section = allSections[i]
		const firstChild = section.firstElementChild
		const animal  = allAnimals[Math.floor(Math.random() * allAnimals.length)]
		const img = document.createElement('img')
		img.src = './assets/images/animal-logos/png/' + animal + '.png'
		img.alt = 'Logo of ' + animal
		img.className = 'section-logo'
		section.insertBefore(img,firstChild)
	}
}


const highlightText = function() {
	const highlitables = document.getElementsByClassName('highlight')
	for (let i = 0 ; i < highlitables.length; i++) {
			const target = highlitables[i]
			if(isInViewport(target)) {
			const background = document.createElement('div')
			background.className = 'highlight-background'
			background.style.background = themeColors[i%themeColors.length]
			target.style.position = 'relative'
			target.style.zIndex = '1'
			

			target.appendChild(background)
			window.setTimeout(()=>{
				background.style.padding = '2px'
				background.style.width = '100%'

			}, Math.random() * 4000)
		}
	}
}
const navBarSetup = () => {
	const navBar = document.getElementsByTagName('nav')[0]
	const navItems = document.getElementsByClassName('nav-items')[0]

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

