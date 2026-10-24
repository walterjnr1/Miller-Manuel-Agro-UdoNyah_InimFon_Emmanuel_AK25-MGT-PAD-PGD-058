document.addEventListener('DOMContentLoaded', () => {
  // Update the copyright year automatically.
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  // Mobile navigation.
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      toggle.textContent = isOpen ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  // Fill the product selector when a product-specific link opens the order page.
  const productSelect = document.getElementById('product');
  if (productSelect) {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('product');
    if (requested) {
      const option = Array.from(productSelect.options).find(opt =>
        opt.text.toLowerCase() === requested.toLowerCase()
      );
      if (option) productSelect.value = option.value;
    }
  }

  // The form opens WhatsApp with a prepared message. It does not pretend to submit
  // an order or take payment. Change the phone number below if business details change.
  const form = document.querySelector('.order-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      const product = document.getElementById('product').value;
      const quantity = document.getElementById('quantity').value.trim();
      const message = document.getElementById('message').value.trim();
      const status = document.getElementById('formStatus');

      if (!name || !phone || !product || !quantity) {
        status.textContent = 'Please complete your name, phone number, product and quantity.';
        return;
      }
      const text = [
        'Hello Miller Manuel Agro Enterprise, I would like to make an enquiry.',
        '',
        `Name: ${name}`,
        `My phone: ${phone}`,
        `Product: ${product}`,
        `Quantity: ${quantity}`,
        message ? `Additional details: ${message}` : '',
        '',
        'Please confirm current availability and price. Thank you.'
      ].filter(Boolean).join('\\n');

      // Nigeria country code +234, using the supplied local phone number.
      const whatsappUrl = 'https://wa.me/2348039279617?text=' + encodeURIComponent(text);
      status.textContent = 'Opening WhatsApp with your enquiry. Review the message and press Send there.';
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
