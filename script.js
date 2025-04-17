
function Guest(name, room, duration) {
    this.name = name;
    this.room = room;
    this.duration = duration;
}


let guests = [];


guests.push(new Guest("Alice Smith", 101, 2));
guests.push(new Guest("Bob Johnson", 205, 3));


const checkInForm = document.getElementById('checkInForm');
const guestListDiv = document.getElementById('guestList');
const roomAvailabilityDiv = document.getElementById('roomAvailability');


function renderGuestList() {
    guestListDiv.innerHTML = ''; 
    guests.forEach(guest => {
        const guestCard = document.createElement('div');
        guestCard.classList.add('guest-card');
        guestCard.innerHTML = `
            <h5 class="guest-info">${guest.name}</h5>
            <p class="guest-info">Room: ${guest.room}</p>
            <p class="guest-info">Staying for: ${guest.duration} nights</p>
        `;
        guestListDiv.appendChild(guestCard);
    });
}


function isRoomAvailable(roomNumber) {
    return !guests.some(guest => guest.room === parseInt(roomNumber));
}


checkInForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const guestNameInput = document.getElementById('guestName');
    const roomNumberInput = document.getElementById('roomNumber');
    const stayDurationInput = document.getElementById('stayDuration');

    const guestName = guestNameInput.value.trim();
    const roomNumber = parseInt(roomNumberInput.value);
    const stayDuration = parseInt(stayDurationInput.value);

  
    if (!guestName || isNaN(roomNumber) || isNaN(stayDuration)) {
        alert('Please fill in all fields.');
        return;
    }

  
    if (!isRoomAvailable(roomNumber)) {
        roomAvailabilityDiv.textContent = `Room ${roomNumber} is already occupied. Please choose another room.`;
        return;
    } else {
        roomAvailabilityDiv.textContent = ''; 
    }

   
    const newGuest = new Guest(guestName, roomNumber, stayDuration);

  
    guests.push(newGuest);

  
    renderGuestList();

 
    guestNameInput.value = '';
    roomNumberInput.value = '';
    stayDurationInput.value = '';
});


renderGuestList();