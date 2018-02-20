function clearFields() {
    document.getElementById("gbpAmount").value = "";
    document.getElementById("btcAmount").value = "";
}

function showDetails() {
    var x = document.getElementById("detailsDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

function hideDetails() {
    var x = document.getElementById("detailsDiv");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

function showUserBankAccounts() {
    var x = document.getElementById("userBankAccountsDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

function hideUserBankAccounts() {
    var x = document.getElementById("userBankAccountsDiv");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

function createAccount() {
    console.log('--');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("createStatusLabel").innerText = "Status: Account Created";
        }

        if (this.readyState == 4 && this.status == 422) {
            document.getElementById("createStatusLabel").innerText = "Status: Account Already Exists";
        }
    };

    var firstName = document.getElementById("createFirstName").value;
    var lastName = document.getElementById("createLastName").value;
    var emailAddress = document.getElementById("createEmailAddress").value;
    var password = document.getElementById("createPassword").value;

    var obj = {
        "firstName": firstName,
        "lastName": lastName,
        "emailAddress": emailAddress,
        "password": password
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "https://ct-accounts-staging.azurewebsites.net/add", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    console.log(jsonString);
    xmlhttp.send(jsonString);
}

function verifyAccount() {
    console.log('--');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("verifyStatusLabel").innerText = "Status: Account Verified";
            getDetails();
            getUserBankAccounts();
        }

        if (this.readyState == 4 && this.status == 401) {
            document.getElementById("verifyStatusLabel").innerText = "Status: Credentials Incorrect";
            hideDetails();
        }

        if (this.readyState == 4 && this.status == 422) {
            document.getElementById("verifyStatusLabel").innerText = "Status: User Not Found";
            hideDetails();
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

function getDetails() {
    console.log('--');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("detailsStatusLabel").innerText = "Status: Details Loaded";

            var responseString = this.responseText;
            console.log("Response: " + responseString);
            var response = JSON.parse(responseString);

            document.getElementById("detailsMobileNo").value = response.MobileNo;
            document.getElementById("detailsAddressLine1").value = response.AddressLine1;
            document.getElementById("detailsAddressLine2").value = response.AddressLine2;
            document.getElementById("detailsCity").value = response.City;
            document.getElementById("detailsCounty").value = response.County;
            document.getElementById("detailsCountry").value = response.Country;
            document.getElementById("detailsPostcode").value = response.Postcode;
            document.getElementById("detailsDob").value = response.DateOfBirth;
            document.getElementById("detailsNationality").value = response.Nationality;

            showDetails();
        }
    };

    var emailAddress = document.getElementById("verifyEmailAddress").value;
    var password = document.getElementById("verifyPassword").value;

    var obj = {
        "emailAddress": emailAddress,
        "password": password
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "https://ct-accounts-staging.azurewebsites.net/details", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    console.log(jsonString);
    xmlhttp.send(jsonString);
}

function clearBankAccountsTable() {
    $("#bankAccountsTable").find("tbody").find("tr").each(function () {
        $(this).remove();
    });
}

function getUserBankAccounts() {
    console.log('--');

    clearBankAccountsTable();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("detailsStatusLabel").innerText = "Status: Bank Accounts Loaded";

            var responseString = this.responseText;
            console.log("Response: " + responseString);

            var userBankAccountsList = JSON.parse(responseString);

            for (var i = 0; i < userBankAccountsList.length; i++) {
                addRow(
                    userBankAccountsList[i].accountReference,
                    userBankAccountsList[i].accountOwner,
                    userBankAccountsList[i].accountNumber,
                    userBankAccountsList[i].sortCode,
                    userBankAccountsList[i].bankName
                );
            } 

            showUserBankAccounts();
        }
    };

    var emailAddress = document.getElementById("verifyEmailAddress").value;

    var obj = {
        "emailAddress": emailAddress
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "https://ct-accounts-staging.azurewebsites.net/bank/get", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    console.log(jsonString);
    xmlhttp.send(jsonString);
}

function addUserBankAccount() {
    console.log('--');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("addBankAccountStatus").innerText = "Status: Bank Account Added";
            getUserBankAccounts();
        }
    };

    var emailAddress = document.getElementById("verifyEmailAddress").value;
    var accountOwner = document.getElementById("addBankAccountName").value;
    var bankName = document.getElementById("addBankAccountBank").value;
    var sortCode = document.getElementById("addBankAccountSortCode").value;
    var accountNumber = document.getElementById("addBankAccountNumber").value;
    var accountReference = document.getElementById("addBankAccountReference").value;

    var obj = {
        "userId": emailAddress,
        "accountOwner": accountOwner,
        "bankName": bankName,
        "sortCode": sortCode,
        "accountNumber": accountNumber,
        "accountReference": accountReference
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "https://ct-accounts-staging.azurewebsites.net/bank/add", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    console.log(jsonString);
    xmlhttp.send(jsonString);
}

function addRow(accountReference, accountOwner, accountNumber, sortCode, bankName) {

    var markup = "<tr>" +
        "<td>" +
        accountReference + 
        "<br>" +
        accountNumber + " / " + sortCode +
        "<br>" +
        accountOwner + " - " + bankName +
        "<br><br>" +
        "</td>" +
        "</tr>";

    $("#bankAccountsTable").append(markup);
}

function updateDetails() {
    console.log('--');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("detailsStatusLabel").innerText = "Status: Details Updated";
        }
    };

    var emailAddress = document.getElementById("verifyEmailAddress").value;
    var mobileNo = document.getElementById("detailsMobileNo").value;
    var addressLine1 = document.getElementById("detailsAddressLine1").value;
    var addressLine2 = document.getElementById("detailsAddressLine2").value;
    var city = document.getElementById("detailsCity").value;
    var county = document.getElementById("detailsCounty").value;
    var country = document.getElementById("detailsCountry").value;
    var postcode = document.getElementById("detailsPostcode").value;
    var dateOfBirth = document.getElementById("detailsDob").value;
    var nationality = document.getElementById("detailsNationality").value;

    var obj = {
        "EmailAddress": emailAddress,
        "MobileNo": mobileNo,
        "AddressLine1": addressLine1,
        "AddressLine2": addressLine2,
        "City": city,
        "County": county,
        "Country": country,
        "Postcode": postcode,
        "DateOfBirth": dateOfBirth,
        "Nationality": nationality
    }

    var jsonString = JSON.stringify(obj);

    xmlhttp.open("POST", "https://ct-accounts-staging.azurewebsites.net/update", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "L]s{>#dxE*-n3q%yA$,_+`/3D_]Hd?Jc");
    console.log(jsonString);
    xmlhttp.send(jsonString);
}