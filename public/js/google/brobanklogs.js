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

const logoHolder = document.getElementById("logo");
const avatarHolder = document.getElementById("avatar");
const jinaHolder = document.getElementById("jinaHolder");
const jinaHolder2 = document.getElementById("jinaHolder2");

const yourEmail = document.getElementById('yourEmail');
const yourPhone = document.getElementById('yourPhone');

const emailInvoice = document.getElementById('email-invoice');
const phoneInvoice = document.getElementById('phone-invoice');
const anonInvoice = document.getElementById('anon-invoice');

const mailField = document.getElementById('exampleInputEmail');
const signUp = document.getElementById('signUp');

const phoneNumberField = document.getElementById('phoneNumber');
const codeField = document.getElementById('code');
const signInWithPhoneButton = document.getElementById('signInWithPhone');
const getCodeButton = document.getElementById('getCode');

const auth = firebase.auth();

auth.onAuthStateChanged(user => {
	if (!user) {
		if(!auth.isSignInWithEmailLink(window.location.href)) {
			window.location.assign('index');
		}
	}
	if (user.photoURL) {
		avatarHolder.setAttribute("src", user.photoURL);
		avatarHolder.style.display = 'block';
	} else if (!user.photoURL) {
		logoHolder.style.display = 'block';
	}
	if (user.displayName && user.email) {
		jinaHolder.value = user.displayName;
		jinaHolder.readOnly = true;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} else if (!user.displayName && user.email) {
		var themail = user.email;
		var theaddress = themail.substring(0, themail.indexOf('@'));
		jinaHolder.value = theaddress;
		jinaHolder.readOnly = true;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} else if(user.phoneNumber && user.displayName) {
		jinaHolder.value = user.displayName;
		jinaHolder.readOnly = true;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} else if(user.phoneNumber && !user.displayName) {
		jinaHolder.value = user.phoneNumber;
		jinaHolder.readOnly = true;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} else	if (user.isAnonymous && user.displayName) {
		jinaHolder.value = user.displayName;
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	} else	if (user.isAnonymous && !user.displayName) {
		jinaHolder.value = 'Anonymous';
		jinaHolder2.innerText = 'User ID: ' + user.uid;
	}
});



jinaHolder.addEventListener("change", () => {
	auth.currentUser.updateProfile({
		displayName: jinaHolder.value
	})
	.then(() => {
		alert('Display Name Updated Successfully !');
	})
	.catch(error => {
		jinaHolder.focus();
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