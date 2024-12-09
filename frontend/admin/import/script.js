function submit() {
    // read the json file
    var file = document.getElementById("fileInput").files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = JSON.parse(e.target.result);
        handleData(data);
    }
    reader.readAsText(file);
}

/*
    Config format:
        {
            name: String
            daysToKeep: Number
            people: {
                "personid": {
                    name: String
                    current: {
                        balance: Number
                        timestamp: Number
                    }
                    transactions: [
                        {
                            balance: Number
                            timestamp: Number
                            label: String
                        }
                    ]
                }
            }
            balance: Number
        }

    for each person, we need to:
    - create a user with the name
    - submit archived transactions for each transaction in the transactions array
*/

async function handleData(data) {
    // loop through the people
    for (var personID in data.people) {
        var person = data.people[personID];
        // create the user
        var response = await api.post("/user/add", {name: person.name});
        if (response.status !== "success") {
            alert("Could not add user");
            return;
        }
        var userID = response.newUserID;
        // submit the archived transactions
        for (var transaction of person.transactions) {
            var response = await api.post("/transaction/submitArchived", {
                userID,
                amount: transaction.balance,
                comment: transaction.label,
                timestamp: transaction.timestamp
            });
            if (response.status !== "success") {
                alert("Could not submit transaction");
                return;
            }
        }
    }
}