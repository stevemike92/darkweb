auth.onAuthStateChanged(user => {
	"use strict";
	var toast = localStorage.getItem('banktotal')
	let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1h');
	var toastbitcoin = '';
	ws.onmessage = (event) => {
		let stockObject = JSON.parse(event.data);
		toastbitcoin = (toast / (parseFloat(stockObject.k.c))).toFixed(5);
	}
	var i = -1;
	var $toastlast;

	var getMessage = function() {
		let items = [];
		items = JSON.parse(localStorage.getItem('banklogs'));
		if (((JSON.parse(localStorage.getItem('banklogs')).length) == 1)) {
            for (var i = 0; i < items.length; i++) {
                var msgs = [`
                    ${toastbitcoin} Bitcoin payment not detected
                    <hr>
                    Scan the bitcoin address and send $${toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} to download: 
                    <hr>
                    ${items[0].account.replace(']',' ACCOUNT]')} with ${items[0].balance} 
                    <hr>
                    You can also top up your account balance on the deposit page, and use 
                    the funds in your account to purchase banklogs on this darkweb store.
                `];
                i++;
                if (i === msgs.length) {
                    i = 0;
                }
                return msgs[i];
            }
		} else if (((JSON.parse(localStorage.getItem('banklogs')).length) == 2)) {
            for (var i = 0; i < items.length; i++) {
                var msgs = [`
                    ${toastbitcoin} Bitcoin payment not detected
                    <hr>
                    Scan the bitcoin address and send $${toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} to download: 
                    <hr>
                    ${items[0].account.replace(']',' ACCOUNT]')} with ${items[0].balance} 
                    <hr>
                    ${items[1].account.replace(']',' ACCOUNT]')} with ${items[1].balance} 
                    <hr>
                    You can also top up your account balance on the deposit page, and use 
                    the funds in your account to purchase banklogs on this darkweb store.
                `];
                i++;
                if (i === msgs.length) {
                    i = 0;
                }
                return msgs[i];
            }
		} else if (((JSON.parse(localStorage.getItem('banklogs')).length) > 2)) {
            for (var i = 0; i < items.length; i++) {
                var msgs = [`
                    ${toastbitcoin} Bitcoin payment not detected
                    <hr>
                    Scan the bitcoin address and send $${toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} to download: 
                    <hr>
                    ${JSON.parse(localStorage.getItem('banklogs')).length} Bank Logs, they'll be grouped together in one large folder. 
                    <hr>
                    You can also top up your account balance on the deposit page, and use 
                    the funds in your account to purchase banklogs on this darkweb store.
                `];
                i++;
                if (i === msgs.length) {
                    i = 0;
                }
                return msgs[i];
            }
		}
	};

	var toastbut = document.getElementById('showtoasts');

	$(toastbut).click(function() {
		var shortCutFunction = 'success';
		var msg = '';
		var title = '';
		toastr.options = {
			closeButton: true,
			debug: false,
			newestOnTop: true,
			progressBar: true,
			positionClass: 'toast-top-full-width',
			preventDuplicates: true,
			onclick: null
		};
		if (!msg) {
			msg = getMessage();
		}
		var $toast = toastr[shortCutFunction](msg, title);
		$toastlast = $toast;
	});

});