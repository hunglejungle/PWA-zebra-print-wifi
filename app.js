function printBadge() {
    try {
        var firstName = document.getElementById("first").value;
        var lastName = document.getElementById("last").value;
        var output = document.getElementById("output");

        // ZPL command for the label
        var zpl = "^XA^PW400^LL200^FO50,50^A0N,30,30^FDHello! My Name is^FS^FO50,100^A0N,50,50^FD" + firstName + "^FS^FO50,150^A0N,50,50^FD" + lastName + "^FS^XZ";
        var url = "http://192.168.2.149/pstprnt";  // Replace with the actual IP of your Zebra printer

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    output.innerHTML = "Label sent successfully!";
                    alert('Label sent successfully!');
                } else {
                    output.innerHTML = "Failed to send label. Status: " + request.status + " - " + request.statusText;
                    alert('Failed to send label. Status: ' + request.status + ' - ' + request.statusText);
                }
            }
        };

        request.onerror = function () {
            output.innerHTML = "Error: Unable to send the request.";
            alert('Failed to send the request.');
        };

        request.ontimeout = function () {
            output.innerHTML = "Request timed out.";
            alert('Request timed out.');
        };

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        request.timeout = 5000;  // 5 seconds

        alert('Sending ZPL data to printer...');
        request.send(zpl);
    } catch (e) {
        alert('Error: ' + e.message);
        console.error('Error:', e);
    }
}
