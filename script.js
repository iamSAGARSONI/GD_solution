// script.js
// Button handlers
const orderButtons = document.querySelectorAll('.order');
orderButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.dataset.product;
    alert(`Thank you! Your request for the ${product} bin has been received.`);
  });
});

const preorderBtn = document.getElementById('preorder-btn');
preorderBtn.addEventListener('click', () => {
  window.location.href = '#preorder';
});
