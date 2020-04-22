const themeColors = [
	'#49C9D1',
	'#FFC700',
	'#FF6759',
	'#BFD84F'
]
docReady(function() {
	highlightText()
	navBarSetup()

	window.addEventListener('navigating', () => {
		console.log('yolo')
		highlightText()
	})
})


const highlightText = () => {
	console.log('highlight text')
	const highlitables = document.getElementsByClassName('highlight')
	for (let i = 0 ; i < highlitables.length; i++) {
		const background = document.createElement('div')
		background.className = 'highlight-background'
		background.style.background = themeColors[i%highlitables.length]

		highlitables[i].style.position = 'relative'
		highlitables[i].appendChild(background)
		window.setTimeout(()=>{
			background.style.width = '100%'
		}, i * 1000)
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