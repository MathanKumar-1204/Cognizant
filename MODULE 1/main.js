// 1. JS Setup: Welcome message and page load alert
console.log("Welcome to the Community Portal");
window.addEventListener('load', () => {
  alert('Page fully loaded!');
});

// 2. Event Data & Operations
class Event {
  constructor(name, date, location, category, seats) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.category = category;
    this.seats = seats;
  }
}
Event.prototype.checkAvailability = function() {
  return this.seats > 0 && new Date(this.date) > new Date();
};

// Initial event list
let events = [
  new Event('Music Festival', '2024-06-15', 'Central Park', 'Music', 10),
  new Event('Food Festival', '2024-07-01', 'Downtown Square', 'Food', 5),
  new Event('Book Fair', '2024-08-05', 'Community Library', 'Tech', 0),
];

// Closure for total registrations by category
function createCategoryCounter() {
  const counts = {};
  return function(category) {
    counts[category] = (counts[category] || 0) + 1;
    return counts[category];
  };
}
const incrementCategoryRegistration = createCategoryCounter();

// 3. Render Events
function renderEvents(filterFn = () => true) {
  const eventsContainer = document.querySelector('.events .eventCard table');
  // Remove all rows except header
  eventsContainer.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());
  events.filter(e => e.checkAvailability()).filter(filterFn).forEach(event => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${event.name}</td>
      <td>${event.date}</td>
      <td>${event.location}</td>
      <td>${event.category}</td>
      <td>${event.seats}</td>
      <td><button class="register-btn" data-name="${event.name}">Register</button></td>
    `;
    eventsContainer.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  setupFilters();
  setupSearch();
});

// 4. Register User
function registerUser(eventName, userData) {
  try {
    const eventObj = events.find(e => e.name === eventName);
    if (!eventObj) throw new Error('Event not found');
    if (!eventObj.checkAvailability()) throw new Error('Event is full or past');
    eventObj.seats--;
    incrementCategoryRegistration(eventObj.category);
    renderEvents();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// 5. Event Delegation for Register Buttons
// (after DOMContentLoaded)
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('register-btn')) {
    const eventName = e.target.getAttribute('data-name');
    showRegistrationForm(eventName);
  }
});

// 6. Show Registration Form Inline
function showRegistrationForm(eventName) {
  const form = document.querySelector('.events form');
  form.elements['eventType'].value = events.find(e => e.name === eventName)?.category || '';
  form.elements['name'].focus();
  form.scrollIntoView({behavior: 'smooth'});
}

// 7. Form Handling & Inline Validation
const regForm = document.querySelector('.events form');
regForm.addEventListener('submit', function(e) {
  e.preventDefault();
  clearFormErrors();
  const { name, email, date, eventType } = regForm.elements;
  let valid = true;
  if (!name.value.trim()) {
    showError(name, 'Name is required');
    valid = false;
  }
  if (!email.value.match(/^\S+@\S+\.\S+$/)) {
    showError(email, 'Valid email required');
    valid = false;
  }
  if (!date.value) {
    showError(date, 'Date required');
    valid = false;
  }
  if (!eventType.value) {
    showError(eventType, 'Select event type');
    valid = false;
  }
  if (!valid) return;
  // Simulate AJAX
  regForm.querySelector('input[type="submit"]').disabled = true;
  regForm.querySelector('#confirmationMessage').textContent = 'Registering...';
  const userData = {
    name: name.value,
    email: email.value,
    date: date.value,
    eventType: eventType.value
  };
  // Simulate fetch
  setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed'))
      .then(() => {
        if (registerUser(events.find(e => e.category === eventType.value)?.name, userData)) {
          regForm.querySelector('#confirmationMessage').textContent = 'Registration successful!';
        } else {
          regForm.querySelector('#confirmationMessage').textContent = 'Registration failed.';
        }
        regForm.querySelector('input[type="submit"]').disabled = false;
      })
      .catch(() => {
        regForm.querySelector('#confirmationMessage').textContent = 'Server error.';
        regForm.querySelector('input[type="submit"]').disabled = false;
      });
  }, 1200);
});

function showError(input, message) {
  let err = document.createElement('span');
  err.className = 'form-error';
  err.style.color = 'red';
  err.style.fontSize = '0.9em';
  err.textContent = message;
  input.parentNode.appendChild(err);
  input.style.outline = '2px solid red';
}
function clearFormErrors() {
  regForm.querySelectorAll('.form-error').forEach(e => e.remove());
  regForm.querySelectorAll('input, select').forEach(i => i.style.outline = '');
}

// 8. Filtering and Searching
function setupFilters() {
  const eventTypeSelect = document.getElementById('eventType');
  eventTypeSelect.addEventListener('change', function() {
    renderEvents(e => !eventTypeSelect.value || e.category === eventTypeSelect.value);
  });
}
function setupSearch() {
  // Add a search box if not present
  let searchBox = document.getElementById('eventSearch');
  if (!searchBox) {
    searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.placeholder = 'Search events...';
    searchBox.id = 'eventSearch';
    searchBox.style.margin = '1rem 0';
    document.querySelector('.events').insertBefore(searchBox, document.querySelector('.events .eventCard'));
  }
  searchBox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      renderEvents(ev => ev.name.toLowerCase().includes(searchBox.value.toLowerCase()));
    }
  });
}

// 9. Fetch Events from Mock API (Async/Await)
async function fetchEvents() {
  document.querySelector('.events .eventCard table').innerHTML = '<tr><th>Event</th><th>Date</th><th>Location</th><th>Category</th><th>Seats</th><th></th></tr>';
  const spinner = document.createElement('div');
  spinner.textContent = 'Loading events...';
  spinner.id = 'spinner';
  document.querySelector('.events .eventCard').appendChild(spinner);
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    await new Promise(r => setTimeout(r, 1000)); // Simulate delay
    if (!res.ok) throw new Error('Failed to fetch');
    // Just for demo, don't update events array
    spinner.remove();
    renderEvents();
  } catch (err) {
    spinner.textContent = 'Failed to load events.';
  }
}
// Uncomment to test fetching
// fetchEvents();

// 10. Debugging: Log form submission
regForm.addEventListener('submit', function(e) {
  console.log('Form submitted:', {
    name: regForm.elements['name'].value,
    email: regForm.elements['email'].value,
    date: regForm.elements['date'].value,
    eventType: regForm.elements['eventType'].value
  });
}); 