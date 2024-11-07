function sendConfirmationMessage() {
    var clientName = document.getElementById("clientName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var message = "Dear " + clientName + ", your booking has been confirmed.";

    // Replace these values with your Twilio account credentials
    var accountSid = 'ACfedd073b906e6ee8c8a3412d44e6bcbc';
    var authToken = 'c7ad1bb31db0b098649e833e58a39e49';

    // Twilio API endpoint for sending SMS messages
    var apiUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json';

    // Construct the payload for the API request
    var payload = {
        To: 9937336111,
        From: '+125157782',
        Body: message
    };

    // Send the SMS message using fetch API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken)
        },
        body: new URLSearchParams(payload)
    })
    .then(response => {
        if (response.ok) {
            alert("Confirmation message sent to your phone number.");
        } else {
            alert("Failed to send confirmation message.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Failed to send confirmation message.");
    });
}


// JavaScript code to calculate total price based on price package and tour duration
document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate total price
    function calculateTotalPrice() {
        // Get price package
        var pricePackage = document.getElementById("pricePackage").value;
        
        // Get start and end dates
        var startDate = new Date(document.getElementById("startDate").value);
        var endDate = new Date(document.getElementById("endDate").value);
        
        // Calculate duration in days
        var duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
        
        // Set price per day based on price package
        var pricePerDay;
        switch(pricePackage) {
            case "basic":
                pricePerDay = 1500; // Example price
                break;
            case "standard":
                pricePerDay = 1700; // Example price
                break;
            case "premium":
                pricePerDay = 2500; // Example price
                break;
            default:
                pricePerDay = 0;
        }
        
        // Calculate total price
        var totalPrice = pricePerDay * duration;
        
        // Display total price
        document.getElementById("totalPrice").textContent = totalPrice.toFixed(2); // Display with 2 decimal places
    }
    
    // Add event listeners to relevant fields
    document.getElementById("pricePackage").addEventListener("change", calculateTotalPrice);
    document.getElementById("startDate").addEventListener("change", calculateTotalPrice);
    document.getElementById("endDate").addEventListener("change", calculateTotalPrice);
    
    // Initially calculate total price
    calculateTotalPrice();
});

      // JavaScript code to handle payment methods
      function showPaymentFields() {
        var paymentMethod = document.getElementById("paymentMethod").value;
        document.getElementById("upiPaymentDetails").style.display = "none";
        document.getElementById("cardPaymentDetails").style.display = "none";
        document.getElementById("qrPaymentDetails").style.display = "none";
        document.getElementById("paymentStatus").textContent = "";

        if (paymentMethod === "upi") {
            document.getElementById("upiPaymentDetails").style.display = "block";
        } else if (paymentMethod === "card") {
            document.getElementById("cardPaymentDetails").style.display = "block";
        } else if (paymentMethod === "qr") {
            document.getElementById("qrPaymentDetails").style.display = "block";
        }
    }


    //payment making
    function makePayment() {
        var clientName = document.getElementById("clientName").value;
        var state = document.getElementById("state").value;
        var startDate = document.getElementById("startDate").value;
        var endDate = document.getElementById("endDate").value;
        var hotelBooking = document.getElementById("hotelBooking").value;
        var travelMode = document.getElementById("travelMode").value;
        var pricePackage = document.getElementById("pricePackage").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        var email = document.getElementById("email").value;

        // Check if all fields are filled
        if (clientName && state && startDate && endDate && hotelBooking && travelMode && pricePackage && phoneNumber && email) {
            document.getElementById("travel-booking").style.display = "none"; // Hide travel booking section
            document.querySelector(".payment").style.display = "block"; // Show payment section
        } else {
            alert("Please fill in all the details before making payment.");
        }
        // Send OTP to respective phone number (simulate this action)
        sendOTP();
         
    }



    //details editing
    function editDetails() {
        document.getElementById("travel-booking").style.display = "block"; // Show travel booking section
        document.querySelector(".payment").style.display = "none"; // Hide payment section
    }



//messaging confirmation
function sendConfirmationMessage() {
    var clientName = document.getElementById("clientName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;

    var message = "Dear " + clientName + ", thank you for booking with us! Your tour has been confirmed from " + startDate + " to " + endDate + ".";

    fetch('/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            phoneNumber: phoneNumber
        }),
    })
    .then(response => {
        if (response.ok) {
            alert("Booking successful! Confirmation message sent to your phone.");
        } else {
            alert("Booking successful! Failed to send confirmation message.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Booking successful! Failed to send confirmation message.");
    });

    return false;
}


//sending otp
function sendOTP() {
    // Simulating sending OTP, you can replace this with your actual implementation
    // In this example, let's assume the OTP is "123456"
    var otp = "123456";
    alert("OTP sent to your phone number: " + otp);
}


//otp verification
function verifyOTP() {
    var enteredOTP = document.getElementById("otpValue").value;
    // Simulating OTP verification, you can replace this with your actual implementation
    if (enteredOTP === "123456") {
        // OTP is correct, show the Confirm Booking button
        document.getElementById("otpInput").style.display = "none";
        document.getElementById("confirmBookingButton").style.display = "block";
    } else {
        // OTP is incorrect, display error message
        document.getElementById("paymentStatus").innerText = "Incorrect OTP. Please try again.";
    }
}



//confirmation button
function confirmBooking() {
    // Your code to confirm the booking
    document.getElementById("paymentStatus").innerText = "Booking confirmed!";
}


//excel file generating
    function generateExcelFile() {
        // Get the booking details
        var clientName = document.getElementById("clientName").value;
        var state = document.getElementById("state").value;
        var startDate = document.getElementById("startDate").value;
        var endDate = document.getElementById("endDate").value;
        var hotelBooking = document.getElementById("hotelBooking").value;
        var travelMode = document.getElementById("travelMode").value;
        var pricePackage = document.getElementById("pricePackage").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        var email = document.getElementById("email").value;

        // Format the data into an array
        var data = [
            ["Client Name", clientName],
            ["State", state],
            ["Tour Start Date", startDate],
            ["Tour End Date", endDate],
            ["Hotel Booking", hotelBooking],
            ["Travel Mode", travelMode],
            ["Price Package", pricePackage],
            ["Phone Number", phoneNumber],
            ["Email", email]
        ];

        // Convert data to CSV format
        var csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(function(rowArray) {
            var row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        // Create a link and trigger download
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", clientName + "_booking_details.csv");
        document.body.appendChild(link); // Required for Firefox
        link.click();
    }


    //confirmation page
    function confirmBooking() {
        // Your booking confirmation logic goes here
    
        // Redirect to confirmation page after booking is confirmed
        window.location.href = "confirmation.html";
    }
    
 
