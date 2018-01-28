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

function toggleInput() {
    var x = document.getElementById("inputDiv");
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
    console.log('--');
    toggleInput();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var responseString = this.responseText;

            console.log("Response: " + responseString);

            var response = JSON.parse(responseString);

            document.getElementById("btcAmount").value = response.DestAmount;
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

function createTransfer() {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var responseString = this.responseText;
            console.log("Response: " + responseString);
            document.getElementById("createTransferStatusLabel").innerText = `Status: Transfer [${responseString}] created.`;
            document.getElementById("newPendingTransferId").innerText = responseString;

            loadPendingBuyOrders();
            togglePaymentPending();
        }

        if (this.readyState == 4 && this.status == 400) {

            var responseString = this.responseText;
            console.log("Response: " + responseString);
            document.getElementById("createTransferStatusLabel").innerText = "Status: Pending Transaction Exists";
        }
    };

    var btcAmount = document.getElementById("btcAmount").value;
    var walletAddress = document.getElementById("walletAddress").value;
    var emailAddress = document.getElementById("verifyEmailAddress").value;

    alert("Creating Wyre Transfer to send [" + btcAmount + "] BTC to [" + walletAddress + "]");

    var obj = {
        "dest": walletAddress, "sourceCurrency": "GBP",
        "destCurrency": "BTC", "destAmount": btcAmount, "message": "Test USDBTC transaction",
        "autoConfirm": "false", "callbackUrl": "", "emailAddress": emailAddress
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
    console.log('--');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var responseString = this.responseText;
            console.log("Response: " + responseString);
            toggleInput();
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