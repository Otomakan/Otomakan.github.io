
let customHistoryFIFO = [window.location.href]


docReady(()=>{
	populateLinks()
})

function populateLinks (target)  {
	target = target || document
	let links = target.getElementsByTagName('a')
	for(let i=0;i< links.length;i++){
		let link = links[i]
		let nextPage
		const attributes = link.attributes
		if(attributes.href){
			let target = link.getAttribute('target')
			if(target != "_blank"){
				const href = attributes.href.value
				if(attributes.href.nodeValue == "#"){
					link.onclick = (e) =>{
						e.preventDefault()
						const targetY = document.getElementById(target).getBoundingClientRect().y
						let additionalOffset
						if(window.innerWidth < 750)
							additionalOffset = 90
						else
							additionalOffset = 150
						window.scrollBy(0, targetY -additionalOffset)
					}
					continue
				}
					
				else{
					nextPage  = href
				}
			}else 
				continue
		}
		
		link.onclick = (e)=>{
			e.preventDefault()
			e.stopImmediatePropagation()
			const t = e.target

			// Infering the next page titl from its url
			// nextPageTitle
			let nextPageTitle  = nextPage.split('/')

			nextPageTitle = nextPageTitle[nextPageTitle.length-1].split('-')
			nextPageTitle = nextPageTitle.map((word)=>word.charAt(0).toUpperCase()+word.slice(1))
			nextPageTitle = nextPageTitle.join(' ')
			nextPageTitle = nextPageTitle.substr(0, nextPageTitle.length-5)
			//Visual component, make sure to close the navigation menu if any link is clicked
			closeNavBar()
			//Push the new state and call the appropriate function
			history.pushState({title: nextPageTitle}, nextPageTitle, nextPage)
			if(nextPage != '/')
				document.title = nextPageTitle + "  Cozy Group"
			pageTransitionAnimation(nextPage)
		}
	}
}

// Th onpopstate event is used to detect the back and forward button events
window.onpopstate = ()=>{
	// this allows to use the backbutton
	pageTransitionAnimation(location.href)
	populateLinks()

}

const pageTransitionAnimation = (targetUrl)=>{

	let pageContent = document.getElementsByClassName('page-container')[0]
	pageContent.style.transition = "0.3s"
	pageContent.style.transform = "scale(0.8)"
	pageContent.style.transition = "0.5s"
	pageContent.style.opacity = "0"
	window.setTimeout(()=>{
		window.scrollTo(0,0)
		loadTemplate(pageContent,targetUrl)
		pageContent.style.opacity = "1"
		pageContent.style.transform =  "scale(1)"
		populateLinks()
	},500)


}

//This function is used to load some HTML from targetUrl, 
// and replace the content of targetDiv with it.
const loadTemplate = (targetDiv, targetUrl,targetContent) => {
	
	targetDiv.innerHTML = ""
	  fetch(targetUrl).then(res=>{
		res.arrayBuffer().then((ab)=>{
			// Convert the response to string
			let responseString =  String.fromCharCode.apply(null, new Uint8Array(ab))  // }
			 //Parse the response to html
			const parser = new DOMParser()
			const newHTML = parser.parseFromString(responseString,'text/html')
			
			//Identify what we want the new body to be like and replace the existing one with it
			const newBody = newHTML.getElementsByClassName('page-container')[0]
			populateLinks(newBody)
			targetDiv.innerHTML = newBody.innerHTML

		
			// We populate the existing link on the new page
			// Can maybe be optimzed by doing it one step before only on the new links
			// To do that pass a "target" by default it will be documetn
			
			populateLinks()
			addAnimalsInSectionContent()
			
			
			var navigatingEvent = new Event('navigating')
			window.dispatchEvent(navigatingEvent)
			// Make sure that google Analytics gets the message
			if ( typeof ga === "function" && newHTML.length !== 0 ) {
                ga('set', {
                    page: window.location.pathname,
                    title: history.state.title
                })
                ga('send', 'pageview')
        	}
		  })
		})
	.catch(e=>{console.log("There was an error" + console.log(e))})
	// Maybe use blobs by creating a reader then read as texthttp://qnimate.com/an-introduction-to-javascript-blobs-and-file-interface/ but creating blob just uses up client memory
  
	}
	
function closeNavBar () {
	const navItems = document.getElementsByClassName('nav-items')[0]
	navItems.classList.remove('show')
}