// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Prompt Generator
const promptButton = document.getElementById('generate-prompt');
const promptOutput = document.getElementById('prompt-output');

const prompts = [
    "What made you smile today?",
    "Write about a challenge you overcame recently.",
    "List three things you're grateful for today.",
    "Describe your perfect day from start to finish.",
    "What's something new you learned this week?",
    "Write a letter to your future self.",
    "What's your favorite childhood memory?",
    "How would you describe your current mood?",
    "What's one small step you can take toward a goal today?",
    "Write about a person who inspires you and why."
];

promptButton.addEventListener('click', () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    promptOutput.textContent = randomPrompt;
    promptOutput.style.animation = 'none';
    void promptOutput.offsetWidth; // Trigger reflow
    promptOutput.style.animation = 'fadeIn 1s';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.feature, .product-card, .testimonial, .prompt-generator');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for reveal elements
document.querySelectorAll('.feature, .product-card, .testimonial, .prompt-generator').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Simple cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');

let cartItems = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartItems++;
        cartCount.textContent = cartItems;
        
        // Add animation
        cartCount.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    });
});
// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show the success message
        
        // Reset form
        contactForm.reset();
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth' });
    });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
        
        // Close other open items
        faqQuestions.forEach(q => {
            if (q !== question && q.parentElement.classList.contains('active')) {
                q.parentElement.classList.remove('active');
            }
        });
    });
});

// Live Chat Button
const chatButton = document.querySelector('.chat-button');

if (chatButton) {
    chatButton.addEventListener('click', () => {
        alert("Our live chat is currently offline. Please email us at hello@oasisjournals.com and we'll respond within 24 hours.");
    });
}
// Enhanced Cart Functionality
const cartPanel = document.createElement('div');
cartPanel.className = 'cart-panel';
cartPanel.innerHTML = `
  <div class="cart-header">
    <h3>Your Cart</h3>
    <span class="close-cart">&times;</span>
  </div>
  <div class="cart-items"></div>
  <div class="cart-total">
    <span>Total:</span>
    <span class="total-amount">₹0</span>
  </div>
  <button class="btn primary checkout-btn">Checkout</button>
  <button class="btn secondary continue-shopping">Continue Shopping</button>
`;
document.body.appendChild(cartPanel);

let cart = JSON.parse(localStorage.getItem('oasisCart')) || [];

function updateCart() {
  const cartItems = document.querySelector('.cart-items');
  const totalAmount = document.querySelector('.total-amount');
  
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="item-info">
        <h4>${item.name}</h4>
        <p>₹${item.price} x ${item.quantity}</p>
      </div>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });
  
  totalAmount.textContent = `₹${total}`;
  document.querySelector('.cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('oasisCart', JSON.stringify(cart));
}

// Add to cart functionality
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseInt(productCard.querySelector('.price').textContent.replace('₹', ''));
    
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: 1
      });
    }
    
    updateCart();
    
    // Animation
    cartCount.style.transform = 'scale(1.5)';
    setTimeout(() => {
      cartCount.style.transform = 'scale(1)';
    }, 300);
  });
});

// Toggle cart panel
document.querySelector('.cart-icon').addEventListener('click', (e) => {
  e.preventDefault();
  cartPanel.classList.add('active');
});

document.querySelector('.close-cart').addEventListener('click', () => {
  cartPanel.classList.remove('active');
});

document.querySelector('.continue-shopping').addEventListener('click', () => {
  cartPanel.classList.remove('active');
});

// Remove item from cart
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item')) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    updateCart();
  }
});