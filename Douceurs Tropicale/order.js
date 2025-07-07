// random 4-Digit order number 
function generateOrderNumber() {
    return Math.floor(1000 + Math.random() * 9000); 
}

// submission, main one
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // customer info
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
        showModal('Error', 'Please fill in all customer information.');
        return;
    }

    // order summary
    const items = [
        { id: 'item1', name: 'Banana Bread', price: 4.00 },
        { id: 'item2', name: 'Muffin', price: 2.00 },
        { id: 'item3', name: 'Pie', price: 5.30 },
        { id: 'item4', name: 'Croissant', price: 6.00 }
    ];

    let total = 0;
    let summary = '';

    items.forEach(item => {
        const quantity = document.getElementById(item.id).value;
        if (quantity > 0) {
            const cost = quantity * item.price;
            total += cost;
            summary += `<li>${quantity} x ${item.name} - $${cost.toFixed(2)}</li>`;
        }
    });

    document.getElementById('summary').innerHTML = summary || '<li>No items selected</li>';
    document.getElementById('totalPrice').textContent = `Total: $${total.toFixed(2)}`;

    // === create and store order number for the "My Orders" page
    const orderNumber = generateOrderNumber();
    localStorage.setItem('orderNumber', orderNumber);

    // show order confirmation modal
    showModal('Order Confirmation', 
        `Thank you, ${name}! Your order has been placed.\n` +
        `🧾 Your Order Number is: ${orderNumber}\n` +
        `Track it on the 'My Order(s)' page.`
    );

    // clear whole form after submitting
    this.reset();
});

// selection and menu buttons
document.querySelectorAll('.menu-item button, .package-item button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent overlapping listeners
        const parent = event.target.closest('.menu-item, .package-item');
        const itemLabel = parent.querySelector('label')?.textContent || 
                          parent.querySelector('h4')?.textContent || 
                          'an item';
        const option = event.target.textContent;
        showModal('Selection Confirmed', `You selected: ${itemLabel} - ${option}`);
    });
});

// modal popup
function showModal(title, message) {
    
    const existingModal = document.querySelector('.modal-popup');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.classList.add('modal-popup');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <button id="closeModal">OK</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.remove();
    });
}
  