var firebaseConfig = {
	apiKey: "AIzaSyCu_nRoURohiSg1EiPq0-j688c7h8huVb0",
	authDomain: "darkweb-cx.firebaseapp.com",
	projectId: "darkweb-cx",
	storageBucket: "darkweb-cx.appspot.com",
	messagingSenderId: "1055160986860",
	appId: "1:1055160986860:web:c6111daab14ed88c6449c9",
	measurementId: "G-RHT9YVDQEG"
};
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const logoHolder = document.getElementById("logo");
const avatarHolder = document.getElementById("avatar");
const jinaHolder = document.getElementById("jinaHolder");
const jinaHolder2 = document.getElementById("jinaHolder2");
const paidText = document.getElementById('paid-text');


auth.onAuthStateChanged(user => {
	if (!user) {
		window.location.assign("index");
	}
	if (user.photoURL) {
		avatarHolder.setAttribute("src", user.photoURL);
		avatarHolder.style.display = 'block';
	} else if (!user.photoURL) {
		logoHolder.style.display = 'block';
	}
	if (user.displayName && user.email) {
		jinaHolder.value = user.displayName;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
		jinaHolder.readOnly = true;
	} else if (!user.displayName && user.email) {
		var themail = user.email;
		var theaddress = themail.substring(0, themail.indexOf('@'));

		jinaHolder.value = theaddress;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
		jinaHolder.readOnly = true;
	} else if(user.phoneNumber && user.displayName) {
		jinaHolder.value = user.displayName;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
		jinaHolder.readOnly = true;
	} else if(user.phoneNumber && !user.displayName) {
		jinaHolder.value = user.phoneNumber;
		jinaHolder.readOnly = true;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} else 	if (user.isAnonymous && user.displayName) {
		jinaHolder.value = user.displayName;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} else 	if (user.isAnonymous && !user.displayName) {
		jinaHolder.value = 'Anonymous';
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} 

	if(localStorage.getItem('deposit-amount')) {
		paidText.innerHTML = `
		Scan the bitcoin address and send 
		<strong>$${localStorage.getItem('deposit-amount').toLocaleString()}</strong>,
		<br>
		Your deposit will be credited to your account immediately, 
		you'll then use funds in your account to purchase banklogs on this darkweb store.
		<br>
		Pro tip: Use <strong>priority fees</strong> to confirm your bitcoin transactions faster.
	`;
	} 
});

if(!localStorage.getItem('deposit-amount')) {
	document.getElementById('logsection').style.display = 'none'
	document.getElementById('predat').style.display = 'flex';
} else {
	document.getElementById('modal-amount').innerHTML = `
		Send $ <span id="omanyala" class="countup">${localStorage.getItem('deposit-amount').toLocaleString()}</span> 
	`;
}

if(localStorage.getItem('old-balance')) {
	document.getElementById('acc-bal').innerHTML = `Account Balance: <span>$${parseInt(localStorage.getItem('old-balance')).toLocaleString()}</span>`;
} else {
	document.getElementById('acc-bal').innerHTML = `Account Balance: <span>$0</span>`;
}




jinaHolder.addEventListener("change", () => {
	auth.currentUser.updateProfile({
		displayName: jinaHolder.value
	})
	.then(() => {
		alert('Display Name Updated Successfully !');
	})
	.catch(error => {
		jinaHolder.focus()
	})
});



document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 1
setInterval(drawClock, 1000);

function drawClock() {
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();
	grad = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * 2.5);
	grad.addColorStop(0, '#121d33');
	grad.addColorStop(0.5, 'rgba(0,0,0,0)');
	grad.addColorStop(1, '#121d33');
	ctx.strokeStyle = grad;
	ctx.lineWidth = radius * 0;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
	ctx.fillStyle = '#121d33';
	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;
	var num;
	ctx.font = radius * 0.33 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (num = 1; num < 13; num++) {
		ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * 0.87);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * 0.87);
		ctx.rotate(-ang);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	//hour
	hour = hour % 12;
	hour = (hour * Math.PI / 6) +
		(minute * Math.PI / (6 * 60)) +
		(second * Math.PI / (360 * 60));
	drawHand(ctx, hour, radius * 0.5, radius * 0.07);
	//minute
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minute, radius * 0.8, radius * 0.07);
	// second
	second = (second * Math.PI / 30);
	drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}





