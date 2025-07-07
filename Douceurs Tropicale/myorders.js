// ===== Display Order Number on My Orders Page =====
document.addEventListener('DOMContentLoaded', () => {
    const orderNumber = localStorage.getItem('orderNumber');
    const displayArea = document.getElementById('order-number-display');

    if (orderNumber) {
        displayArea.textContent = `Your Last Order Number: ${orderNumber}`;
    } else {
        displayArea.textContent = 'No recent order found.';
    }
});