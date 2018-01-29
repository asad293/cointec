var confirmTimeLengthSeconds = 15;
var timeLeft = confirmTimeLengthSeconds;
var elem = document.getElementById("confirmTimeLeft");
var timerId = setInterval(confirmCountdown, 1000);
var startCountdown = false;

function clearFields() {
    document.getElementById("gbpAmount").value = "";
    document.getElementById("btcAmount").value = "";
    document.getElementById("pendingBuyOrderStatusLabel").innerText = "Status: ";
}

function clearPendingFields() {
    document.getElementById("pendingBtcCtTransactionId").innerText = "";
    document.getElementById("pendingBtcWyreTransferId").innerText = "";
    document.getElementById("pendingBtcTransferStatus").innerText = "";
    document.getElementById("pendingBtcDest").innerText = "";
    document.getElementById("pendingBtcAmount").innerText = "";
    document.getElementById("pendingBtcCurrency").innerText = "";
}

function toggleQuote() {
    var x = document.getElementById("quoteDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleConfirm() {
    var x = document.getElementById("confirmDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggle2FA() {
    var x = document.getElementById("twofaDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function togglePaymentPending() {
    var x = document.getElementById("paymentPendingDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function getQuote() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var responseString = this.responseText;

            console.log("Response: " + responseString);

            var response = JSON.parse(responseString);

            document.getElementById("btcAmount").value = response.DestAmount;
            document.getElementById("rateHiddenField").innerText = response.CustomerRate;

            setConfirmFields();
        }
    };

    var gbpAmount = document.getElementById("gbpAmount").value;
    var obj = {
        "amount": gbpAmount
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "http://ct-quotes-staging.azurewebsites.net/btc", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    console.log(jsonString);
    xmlhttp.send(jsonString);
}

function setConfirmFields() {
    document.getElementById("confirmAmountField").innerText = document.getElementById("btcAmount").value;
    document.getElementById("confirmTotalField").innerText = document.getElementById("gbpAmount").value;
    document.getElementById("confirmRateField").innerText = document.getElementById("rateHiddenField").innerText;
    document.getElementById("confirmPaymentDetailsField").innerText = "Dummy";
    document.getElementById("confirmWalletAddressField").innerText = document.getElementById("walletAddress").value;
}

function resetConfirmTimer() {
    timeLeft = confirmTimeLengthSeconds;
    timerId = setInterval(confirmCountdown, 1000);

    startCountdown = true;
    confirmCountdown();
}

function instantExchange() {
    startCountdown = true;
    toggleConfirm();
}

function confirmCountdown() {
    if (startCountdown == true) {
        if (0 == timeLeft) {
            elem.innerHTML = "EXPIRED. Please refresh your quote to continue.";
            startCountdown = false;
            forceConfirmRefresh();

            clearTimeout(timerId);
        } else {
            elem.innerHTML = `valid for [${timeLeft}] seconds.`;
            timeLeft--;
        }
    }
}

function forceConfirmRefresh() {
    document.getElementById("continueToPaymentButton").disabled = true;
    document.getElementById("refreshConfirmButton").disabled = false;
}

function refreshConfirm() {
    document.getElementById("continueToPaymentButton").disabled = false;
    document.getElementById("refreshConfirmButton").disabled = true;

    getQuote();
    setConfirmFields();

    resetConfirmTimer();
}

function continueToPayment() {

    document.getElementById("confirmTimeLeft").innerText = "LOCKED IN. Please provide payment in the next ten minutes";
    startCountdown = false;

    toggle2FA();
    document.getElementById("startTimestampField").innerText = new Date().getTime();

    var paymentTimeInMinutes = 10;
    var startTimestamp = parseInt(document.getElementById("startTimestampField").innerText);
    var deadline = new Date(startTimestamp + paymentTimeInMinutes * 60 * 1000);
    run_clock("clockdiv", deadline);
}

function complete2FA() {
    createTransfer();
}

function createTransfer() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

        var responseString;

        if (this.readyState == 4 && this.status == 200) {

            responseString = this.responseText;
            console.log("Response: " + responseString);
            document.getElementById("createTransferStatusLabel").innerText = `Status: Transfer [${responseString}] created.`;
            document.getElementById("newPendingTransferId").innerText = responseString;

            loadPendingBuyOrders();
            togglePaymentPending();
        }
        if (this.readyState == 4 && this.status == 400) {

            responseString = this.responseText;
            console.log("Response: " + responseString);
            document.getElementById("createTransferStatusLabel").innerText = "Status: Pending Transaction Exists";
        }
    };

    var btcAmount = document.getElementById("btcAmount").value;
    var walletAddress = document.getElementById("walletAddress").value;
    var emailAddress = document.getElementById("verifyEmailAddress").value;
    var createdAt = document.getElementById("startTimestampField").innerText;

    alert("Creating Wyre Transfer to send [" + btcAmount + "] BTC to [" + walletAddress + "]");

    var obj = {
        "dest": walletAddress, "sourceCurrency": "GBP",
        "destCurrency": "BTC", "destAmount": btcAmount, "message": "Test USDBTC transaction",
        "autoConfirm": "false", "callbackUrl": "", "emailAddress": emailAddress, "createdAt": createdAt
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "http://ct-buy-capture-staging.azurewebsites.net/create", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    console.log(jsonString);
    xmlhttp.send(jsonString);
    document.getElementById("createTransferStatusLabel").innerText = "Status: Awaiting new Transfer ID";
}

function confirmTransfer() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var responseString = this.responseText;
            console.log("Response: " + responseString);
            toggleConfirm();
            toggle2FA();
            togglePaymentPending();
            clearFields();
            clearPendingFields();
        }
    };

    var transferId = document.getElementById("newPendingTransferId").innerText;

    xmlhttp.open("GET", "http://ct-buy-staging.azurewebsites.net/confirm/" + transferId, true);
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    xmlhttp.send();
}

function abandonPendingBuyOrder() {
    var transferId = document.getElementById("pendingBtcWyreTransferId").innerText;
    transferId = transferId.trim();
    console.log("TID: " + transferId);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("pendingBuyOrderStatusLabel").innerText = `Status: Transfer [${transferId}] abandoned.`;
            clearPendingFields();
        }
    };

    xmlhttp.open("GET", "http://ct-buy-staging.azurewebsites.net/abandon/" + transferId, true);
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    xmlhttp.send();
}

function verifyAccount() {
    document.getElementById("verifyStatusLabel").innerText = "Status: Please wait...";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("verifyStatusLabel").innerText = "Status: Account Verified";
            toggleQuote();
            loadPendingBuyOrders();
        }

        if (this.readyState == 4 && this.status == 401) {
            document.getElementById("verifyStatusLabel").innerText = "Status: Credentials Incorrect";
        }

        if (this.readyState == 4 && this.status == 422) {
            document.getElementById("verifyStatusLabel").innerText = "Status: User Not Found";
        }
    };

    var emailAddress = document.getElementById("verifyEmailAddress").value;
    var password = document.getElementById("verifyPassword").value;

    var obj = {
        "emailAddress": emailAddress,
        "password": password
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "https://ct-accounts-staging.azurewebsites.net/verify", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    console.log(jsonString);
    xmlhttp.send(jsonString);
}

function loadPendingBuyOrders() {
    document.getElementById("pendingBuyOrderStatusLabel").innerText = "Loading...";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("pendingBuyOrderStatusLabel").innerText = "Status: Pending Orders Loaded";

            var responseString = this.responseText;
            console.log("Response: " + responseString);

            var pendingOrder = JSON.parse(responseString);
            document.getElementById("pendingBtcCtTransactionId").innerText = pendingOrder[0].ctTransactionId;
            document.getElementById("pendingBtcWyreTransferId").innerText = pendingOrder[0].wyreTransferId;
            document.getElementById("pendingBtcTransferStatus").innerText = pendingOrder[0].transferStatus;
            document.getElementById("pendingBtcDest").innerText = pendingOrder[0].dest;
            document.getElementById("pendingBtcAmount").innerText = pendingOrder[0].destAmount;
            document.getElementById("pendingBtcCurrency").innerText = pendingOrder[0].destCurrency;
        }
    };

    var emailAddress = document.getElementById("verifyEmailAddress").value;

    var obj = {
        "emailAddress": emailAddress
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "http://ct-buy-staging.azurewebsites.net/pending", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    console.log(jsonString);
    xmlhttp.send(jsonString);
}

function time_remaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return { 'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
}
function run_clock(id, endtime) {
    var clock = document.getElementById(id);
    function update_clock() {
        var t = time_remaining(endtime);

        var s = String(t.seconds);
        if (s.length < 2) { s = "0" + s; }

        clock.innerHTML = t.minutes + ":" + s;
        if (t.total <= 0) { clearInterval(timeinterval); }
    }
    update_clock();
    var timeinterval = setInterval(update_clock, 1000);
}
