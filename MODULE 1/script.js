function validatePhone(input) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(input.value)) {
        alert("Invalid phone number. Must be 10 digits.");
        input.focus();
    }
}

function showFee(select) {
    const fees = { Music: "$10", Food: "$5", Tech: "$15" };
    document.getElementById("feeDisplay").innerText = fees[select.value] || "";
}

function submitForm() {
    const form = document.getElementById("registrationForm");
    const confirmation = document.getElementById("confirmation");
    confirmation.value = "Thank you for registering!";
}

function countCharacters() {
    const message = document.getElementById("message");
    document.getElementById("charCount").innerText = message.value.length;
}

function videoReady() {
    document.getElementById("videoStatus").innerText = "Video ready to play";
}

function confirmExit() {
    return "You have unsaved changes. Are you sure you want to leave?";
}

function savePreference() {
    const eventType = document.getElementById("eventType").value;
    localStorage.setItem("preferredEvent", eventType);
    alert("Preference saved.");
}

function clearPreferences() {
    localStorage.clear();
    sessionStorage.clear();
    alert("Preferences cleared.");
}

function getLocation() {
    const output = document.getElementById("location");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                output.innerText = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
            },
            (error) => {
                output.innerText = "Location access denied or unavailable.";
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        output.innerText = "Geolocation not supported.";
    }
}

window.onload = () => {
    const savedType = localStorage.getItem("preferredEvent");
    if (savedType) {
        document.getElementById("eventType").value = savedType;
    }
};
