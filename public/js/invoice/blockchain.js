var binance = new WebSocket("wss://ws.blockchain.info/inv");
binance.onopen = function(){
    binance.send(JSON.stringify({
        "op": "unconfirmed_sub"
    }))
}
binance.onmessage = function(onmsg){
    var response = JSON.parse(onmsg.data);
    var address1 = response.x.out[0].addr;
    var address2 = '1AMjPsZQvqeAfnEjfk17fEUZc6rZuM9Ccp';

    if(localStorage.getItem('deposit-amount')) {
        if(address1 == address2) {
            let coinbase = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1h");
            coinbase.onmessage = event => {
                let confirm = JSON.parse(event.data);
                let coinz = ((response.x.out[0].value / 100000000) * parseFloat(confirm.k.c)).toFixed(0);
                let balance = parseInt(coinz);
    
                if(localStorage.getItem('bitcoin-deposit')) {
                    let oldBalance = parseInt(localStorage.getItem('old-balance'));
                    let newBalance = balance;
                    let totalBalance = newBalance + oldBalance;
                    localStorage.setItem('total-balance', totalBalance);
                    localStorage.setItem('old-balance', totalBalance);
                    document.getElementById('acc-bal').innerHTML = `Balance: <span>$${localStorage.getItem('total-balance')}</span>`
                } else {
                    document.getElementById('acc-bal').innerHTML = `Balance: <span>$${balance}</span>`;
                    localStorage.setItem('old-balance', balance);
                }
    
                localStorage.setItem('bitcoin-deposit', true);
    
                localStorage.removeItem('deposit-amount');
                window.location.reload();
            }
        } 
    } 
}