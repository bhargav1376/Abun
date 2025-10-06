document.addEventListener('DOMContentLoaded', function(){

  /* ==== CURSOR LIGHT MOVEMENT ==== */
  const heroSection = document.querySelector('.abun-hero-k21');
  if (heroSection) {
    heroSection.addEventListener('mousemove', e => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroSection.style.setProperty('--x', `${x}px`);
      heroSection.style.setProperty('--y', `${y}px`);
    });
  }

  /* ==== MENU AND MODAL TOGGLES ==== */
  const menuToggle = document.querySelector('.abun-menu-toggle-p01');
  const nav = document.querySelector('.abun-nav-r09');
  const getStartedBtn = document.querySelector('.abun-cta-btn-e41');
  const startWritingBtn = document.querySelector('.abun-btn-c01');
  const tryFreeBtn = document.querySelector('.abun-btn-c02');
  const modalstyle = document.querySelector('.abun-modal-w88');
  const closeModal = document.querySelector('.abun-close-btn-p19');
  const modal = document.getElementById('abun-modal');
  const modalBox = document.getElementById('abun-modalstyle-box');
  const modalImage = document.getElementById('modal-image');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => { nav.classList.toggle('active'); });
  }

  if (getStartedBtn && modalstyle) {
    getStartedBtn.addEventListener('click', () => { modalstyle.style.display = 'flex'; });
  }

  if (startWritingBtn && modalstyle) {
    startWritingBtn.addEventListener('click', () => {
      modalstyle.style.display = 'flex';
      const heading = document.querySelector('.abun-modal-content-t66 h2');
      if (heading) heading.innerText = "Start Writing with Abun";
    });
  }

  if (tryFreeBtn) {
    tryFreeBtn.addEventListener('click', () => { alert('Here are free Abun resources: https://abun.com/free'); });
  }

  if (closeModal && modalstyle) {
    closeModal.addEventListener('click', () => { modalstyle.style.display = 'none'; });
    window.addEventListener('click', e => { if (e.target === modal) modalstyle.style.display = 'none'; });
  }

  /* ==== SLICK SLIDER ==== */
  const $slider = $('.abun-slick-wrapper');
  if ($slider.length) {
    $slider.slick({
      slidesToShow: 3,
      centerMode: true,
      centerPadding: '0px',
      autoplay: true,
      autoplaySpeed: 2500,
      arrows: true,
      dots: true,
      pauseOnHover: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 }},
        { breakpoint: 600, settings: { slidesToShow: 1 }}
      ]
    });

    // Dynamic icon toggle
    $slider.on('afterChange', function(){
      $('.abun-feature-card').each(function(){
        const icon = $(this).find('.abun-feature-icon i');
        if ($(this).hasClass('slick-center')) {
          icon.addClass('fa-solid').removeClass('fa-regular');
        } else {
          icon.addClass('fa-regular').removeClass('fa-solid');
        }
      });
    });
  }

// Tabs
const tabBtns = document.querySelectorAll('.abun-tab-btn');
const tabContents = document.querySelectorAll('.abun-tab-content');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    tabContents.forEach(c=>{
      if(c.id===tab){ c.style.display="flex"; c.style.justifyContent="center"; }
      else{ c.style.display="none"; }
    });
  });
});

// Price calculation based on dates
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const totalPriceSpan = document.getElementById('total-price');
const planType = document.getElementById('customize-type');
const planPrices = { basic:10, pro:20, business:30 };

[startDate, endDate, planType].forEach(el => {
  el.addEventListener('change', updatePrice);
});

function updatePrice(){
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const type = planType.value;
  if(start && end && end > start && type){
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    totalPriceSpan.innerText = diffDays * planPrices[type];
  } else {
    totalPriceSpan.innerText = 0;
  }
}

// Customize Form Validation
document.getElementById('customize-price-form').addEventListener('submit', e => {
  e.preventDefault();
  const org = document.getElementById('customize-org').value.trim();
  const name = document.getElementById('customize-name').value.trim();
  const email = document.getElementById('customize-email').value.trim();
  const type = planType.value;
  const start = startDate.value;
  const end = endDate.value;

  if (!org || !name || !email || !type || !start || !end) {
    alert('Please fill all fields correctly.');
    return;
  }

  // Open the modal login form instead of redirect
  const modal = document.getElementById('abun-modal');
  const loginWrapper = document.querySelector('.abun-login');
  const signupWrapper = document.querySelector('.abun-signup');
  const forgotWrapper = document.querySelector('.abun-forgot');
  const modalBox = document.getElementById('abun-modalstyle-box');
  const modalImage = document.getElementById('modal-image');
  const loginImage = "images/logincon.jpg";

  modal.style.display = 'flex';
  loginWrapper.classList.add('active');
  signupWrapper.classList.remove('active');
  forgotWrapper.classList.remove('active');
  modalImage.src = loginImage;
  modalBox.classList.remove('signup-mode', 'forgot-mode');
});


// Open modal for any Activate button
document.querySelectorAll('.open-login').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById('abun-modal');
    const loginWrapper = document.querySelector('.abun-login');
    const signupWrapper = document.querySelector('.abun-signup');
    const forgotWrapper = document.querySelector('.abun-forgot');
    const modalBox = document.getElementById('abun-modalstyle-box');
    const modalImage = document.getElementById('modal-image');
    const loginImage = "images/logincon.jpg";

    modal.style.display = 'flex';
    loginWrapper.classList.add('active');
    signupWrapper.classList.remove('active');
    forgotWrapper.classList.remove('active');
    modalImage.src = loginImage;
    modalBox.classList.remove('signup-mode','forgot-mode');
  });
});

// Set today's date as default for start date and prevent past dates
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}-${mm}-${dd}`;

// Set default and min for start date
startDate.value = todayStr;
startDate.setAttribute('min', todayStr);

// Set min for end date based on start date
function updateEndDateMin() {
  const selectedStart = new Date(startDate.value);
  const minEndDate = new Date(selectedStart.getTime() + 24 * 60 * 60 * 1000); // +1 day
  const endYyyy = minEndDate.getFullYear();
  const endMm = String(minEndDate.getMonth() + 1).padStart(2, '0');
  const endDd = String(minEndDate.getDate()).padStart(2, '0');
  const minEndStr = `${endYyyy}-${endMm}-${endDd}`;
  endDate.setAttribute('min', minEndStr);

  // Optional: auto-correct if current end date is now invalid
  if (new Date(endDate.value) < minEndDate) {
    endDate.value = minEndStr;
  }
}

// Call on load and whenever start date changes
updateEndDateMin();
startDate.addEventListener('change', () => {
  updateEndDateMin();
  updatePrice();
});


//  /* ==== LOGIN / SIGNUP / FORGOT HANDLING ==== */
  const openLoginBtn = document.getElementById('open-login');
  const closeBtn = document.querySelector('.abun-close-btn-p19');
  const loginWrapper = document.querySelector('.abun-login');
  const signupWrapper = document.querySelector('.abun-signup');
  const forgotWrapper = document.querySelector('.abun-forgot');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  const switchToForgot = document.getElementById('switch-to-forgot');
  const switchToLoginFromForgot = document.getElementById('switch-to-login-from-forgot');
  const loginImage = "images/logincon.jpg";
  const signupImage = "images/signup.jpg";
  const forgotImage = "images/forgotpassword.jpg";

  if (openLoginBtn) {
    openLoginBtn.onclick = () => {
      modal.style.display = 'flex';
      loginWrapper.classList.add('active');
      signupWrapper.classList.remove('active');
      forgotWrapper.classList.remove('active');
      modalImage.src = loginImage;
      modalBox.classList.remove('signup-mode','forgot-mode');
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => { modal.style.display = 'none'; };
    window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
  }

  if (switchToSignup) switchToSignup.onclick = () => {
    loginWrapper.classList.remove('active');
    signupWrapper.classList.add('active');
    forgotWrapper.classList.remove('active');
    modalBox.classList.add('signup-mode');
    modalImage.src = signupImage;
  };
  if (switchToLogin) switchToLogin.onclick = () => {
    signupWrapper.classList.remove('active');
    forgotWrapper.classList.remove('active');
    loginWrapper.classList.add('active');
    modalBox.classList.remove('signup-mode','forgot-mode');
    modalImage.src = loginImage;
  };
  if (switchToForgot) switchToForgot.onclick = () => {
    loginWrapper.classList.remove('active');
    signupWrapper.classList.remove('active');
    forgotWrapper.classList.add('active');
    modalBox.classList.add('forgot-mode');
    modalImage.src = forgotImage;
  };
  if (switchToLoginFromForgot) switchToLoginFromForgot.onclick = () => {
    forgotWrapper.classList.remove('active');
    loginWrapper.classList.add('active');
    modalBox.classList.remove('forgot-mode');
    modalImage.src = loginImage;
  };

  /* ==== VALIDATIONS ==== */
  function showError(id, msg){ const el=document.getElementById(id); if(el){ el.textContent=msg; el.style.display='block'; }}
  function clearError(id){ const el=document.getElementById(id); if(el){ el.textContent=''; el.style.display='none'; }}

  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e=>{
      e.preventDefault();
      const email=document.getElementById('login-email').value.trim();
      const pass=document.getElementById('login-password').value.trim();
      clearError('login-email-error'); clearError('login-password-error');
      if(email==='') return showError('login-email-error','Email required');
      if(pass==='') return showError('login-password-error','Password required');
      alert('Login Success!');
    });
  }

  // Signup
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', e=>{
      e.preventDefault();
      const name=document.getElementById('signup-name').value.trim();
      const email=document.getElementById('signup-email').value.trim();
      const pass=document.getElementById('signup-password').value.trim();
      const confirm=document.getElementById('signup-confirm-password').value.trim();
      clearError('signup-name-error'); clearError('signup-email-error');
      clearError('signup-password-error'); clearError('signup-confirm-password-error');
      if(name==='') return showError('signup-name-error','Name required');
      if(email==='') return showError('signup-email-error','Email required');
      if(pass==='') return showError('signup-password-error','Password required');
      if(confirm==='') return showError('signup-confirm-password-error','Confirm password required');
      if(pass!==confirm) return showError('signup-confirm-password-error','Passwords do not match');
      alert('Signup Success!');
    });
  }

  // Forgot
  const forgotForm = document.getElementById('forgot-form');
  if (forgotForm) {
    forgotForm.addEventListener('submit', e=>{
      e.preventDefault();
      const email=document.getElementById('forgot-email').value.trim();
      clearError('forgot-email-error');
      if(email==='') return showError('forgot-email-error','Email required');
      alert('Reset link sent!');
    });
  }

  /* ==== CONTACT FORM ==== */
  const contactForm = document.getElementById('abun-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e=>{
      e.preventDefault();
      let valid = true;
      const name = document.getElementById('abun-name').value.trim();
      const email = document.getElementById('abun-email').value.trim();
      const message = document.getElementById('abun-message').value.trim();
      document.getElementById('abun-name-error').innerText = '';
      document.getElementById('abun-email-error').innerText = '';
      document.getElementById('abun-message-error').innerText = '';
      document.getElementById('abun-success-msg').style.display = 'none';

      if(name.length < 1){ document.getElementById('abun-name-error').innerText = 'Name must contain at least 1 letter'; valid = false; }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){ document.getElementById('abun-email-error').innerText = 'Enter a valid email'; valid = false; }
      const words = message.split(/\s+/);
      if(words.length < 5){ document.getElementById('abun-message-error').innerText = 'Message must contain at least 5 words'; valid = false; }

      if(valid){
        document.getElementById('abun-success-msg').style.display = 'block';
        contactForm.reset();
      }
    });
  }

});

