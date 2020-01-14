// Util function to have formatted minutes and seconds
const addZeroToTime = (time) => {
	if (time < 10)
		time = '0' + time;
	return time;
};

(async () => {

	const appState = new Proxy({
		status: '',
		time : 0
	}, {
		set : (target, prop, val) => {
			if (prop === 'status')
				document.getElementById('status').innerHTML = val;
			else if (prop === 'time') {
				const minutesLeft =  addZeroToTime(Math.floor(val / 60));
				const secondsLeft = addZeroToTime(val % 60);
				document.getElementById('timer').innerHTML = minutesLeft + ' : ' + secondsLeft;
			}
      
			target[prop] = val;
		}
	});

	appState.status =  'working';
	appState.time = 5;
	// Checking if we already have permission to send notifications
	const notificationsAllowed = await navigator.permissions.query({name: 'notifications'});

	if (notificationsAllowed.state !== 'granted'){
		window.alert('we need your permission');
		// Requesting permission
		const permission = await Notification.requestPermission();
		console.log(permission);
		if (permission !== 'granted') {
			// I am a very sour developer
			document.body.innerHTML = '<h1> This app can\'t work without notification bye </h1>';
			return;
		}
	}

	const startTimer = (stopCallBack) => {
		// let timeLeft = duration || 20 * 60;

		const nIntervId  = this.setInterval( () => {
			appState.time -= 1;
			if (appState.time === 0) {
				this.clearInterval(nIntervId);
				stopCallBack();
			}
		}, 1000);
	};

	const startToWork = () => {
		const stopWorking = () => {
			const notificationOptions = {
				body : 'Stop Working',
			};
			var notification = new Notification('Stop Working', notificationOptions);
			notification.onclick =  ()=>{console.log('clicked');};
			notification.onclose =  () => {console.log('closed');};
			console.log(notification);
		};
		startTimer(()=>{stopWorking();});

		// var notification = new Notification('Work timer starting');
		// stopWorking();
		// startTimer(1, ()=>{stopWorking()})
	};

	const startToRest = () => {
		startTimer(()=>{console.log('done resting');});
	};

	appState.status === 'rest' ? startToRest() : startToWork();
})();

