// Page unload warning
window.onbeforeunload = function (e) {
  e.preventDefault();
  e.returnValue = 'Are you sure you want to leave? Your changes may not be saved.';
};

// Popup functions
function popup() {
  document.getElementById("welcomeBanner").style.display = "block";
}

function closePopup() {
  document.getElementById("welcomeBanner").style.display = "none";
}

// Image functions
function enlarge(src) {
  const popup = document.getElementById("imagePopup");
  document.getElementById("enlargedImg").src = src;
  popup.style.display = "flex";
}

function closeImage() {
  document.getElementById("imagePopup").style.display = "none";
}

// Form validation and display functions
function validatePhone(input) {
  const regex = /^[0-9]{10}$/;
  if (!regex.test(input.value)) {
    alert("Enter a valid 10-digit phone number.");
    input.focus();
  }
}

function displayFee(select) {
  const feeDisplay = document.getElementById("feeDisplay");
  switch (select.value) {
    case "Music":
      feeDisplay.textContent = "₹500";
      break;
    case "Food":
      feeDisplay.textContent = "₹300";
      break;
    case "Tech":
      feeDisplay.textContent = "₹700";
      break;
    default:
      feeDisplay.textContent = "--";
  }
}

function showMessage() {
  document.getElementById('message').innerText = 'Video ready to play';
}

function countChars() {
  const text = document.getElementById("feedback").value;
  document.getElementById("charCount").textContent = text.length;
}

function showFee(select) {
  const feeDisplay = document.getElementById("feeDisplay");
  const selectedEventType = select.value;
  localStorage.setItem('selectedEventType', selectedEventType);

  switch (selectedEventType) {
    case "Music":
      feeDisplay.textContent = "₹500";
      break;
    case "Food":
      feeDisplay.textContent = "₹300";
      break;
    case "Tech":
      feeDisplay.textContent = "₹700";
      break;
    default:
      feeDisplay.textContent = "--";
  }
}

// Confirmation message functions
function showlogConfirmation(e) {
  e.preventDefault();
  document.getElementById("loginConfirmationMessage").textContent = "Thank you! You're accepted.";
}

function showConfirmation(e) {
  e.preventDefault();
  document.getElementById("confirmationMessage").textContent = "Thank you! Your registration has been accepted.";
}

function showfeedConfirmation(e) {
  e.preventDefault();
  document.getElementById("feedconfirmationMessage").textContent = "Thank you! Your feedback has been submitted.";
}

// Local storage functions
window.onload = function() {
  const savedEventType = localStorage.getItem('selectedEventType');
  if (savedEventType) {
    document.getElementById("eventType").value = savedEventType;
    displayFee(document.getElementById("eventType"));
  }
};

function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  alert("Preferences cleared!");
  location.reload();
}

// Geolocation function
function findNearbyEvents() {
  const locationMessage = document.getElementById("locationMessage");

  if (!navigator.geolocation) {
    locationMessage.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  function success(pos) {
    const crd = pos.coords;
    locationMessage.textContent = `Your current position is: Latitude: ${crd.latitude}, Longitude: ${crd.longitude}`;
  }

  function error(err) {
    let errorMessage;
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = "User denied the request for Geolocation.";
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = "Location information is unavailable.";
        break;
      case err.TIMEOUT:
        errorMessage = "The request to get user location timed out.";
        break;
      default:
        errorMessage = "An unknown error occurred.";
    }
    locationMessage.textContent = errorMessage;
  }

  locationMessage.textContent = "Locating...";
  navigator.geolocation.getCurrentPosition(success, error, options);
}