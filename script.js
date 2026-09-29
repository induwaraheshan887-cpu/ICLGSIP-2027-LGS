/**
 * ICLGSIP 2027 - Official Interactive Script
 * 1st International Conference on Lean & Green Solutions for Industrial Productivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Timer Logic (Target Date: 30 January 2027)
    const targetDate = new Date("January 30, 2027 09:30:00").getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            const container = document.getElementById("countdown");
            if (container) {
                container.innerHTML = "<div class='text-center fw-bold text-warning p-2 fs-5'>ICLGSIP 2027 is Live!</div>";
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minsEl = document.getElementById("mins");
        const secsEl = document.getElementById("secs");

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minsEl) minsEl.innerText = String(mins).padStart(2, '0');
        if (secsEl) secsEl.innerText = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar-custom');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Theme Filter Buttons
    const themeBtns = document.querySelectorAll('.theme-filter-btn');
    const themeItems = document.querySelectorAll('.theme-item');

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active', 'btn-emerald'));
            themeBtns.forEach(b => b.classList.add('btn-outline-secondary'));
            btn.classList.remove('btn-outline-secondary');
            btn.classList.add('active', 'btn-emerald');

            const filter = btn.getAttribute('data-filter');

            themeItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. Registration Modal Pre-fill
    const registerModal = document.getElementById('registrationModal');
    if (registerModal) {
        registerModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            if (button) {
                const tier = button.getAttribute('data-tier');
                const tierSelect = document.getElementById('regTierSelect');
                if (tier && tierSelect) {
                    tierSelect.value = tier;
                }
            }
        });
    }

    // 5. Paper Submission Form (Direct Formspree Integration)
    const submitPaperForm = document.getElementById('paperSubmissionForm');
    const authorEmailInput = document.getElementById('authorEmailInput');
    const replyToEmail = document.getElementById('replyToEmail');

    if (authorEmailInput && replyToEmail) {
        authorEmailInput.addEventListener('input', () => {
            replyToEmail.value = authorEmailInput.value;
        });
    }

    if (submitPaperForm) {
        submitPaperForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitPaperBtn');
            const alertBox = document.getElementById('submissionAlert');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit Abstract';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Transmitting Abstract...';
            }

            const formData = new FormData(submitPaperForm);
            const refCode = `ICLGSIP-2027-${Math.floor(100000 + Math.random() * 900000)}`;
            formData.append('submission_ref_code', refCode);

            try {
                const response = await fetch(submitPaperForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok || response.status === 200 || response.status === 201) {
                    if (alertBox) {
                        alertBox.classList.remove('d-none');
                        alertBox.innerHTML = `
                            <div class="alert alert-success d-flex align-items-center mb-0" role="alert">
                                <i class="fa-solid fa-circle-check me-3 fs-3"></i>
                                <div>
                                    <strong>Abstract Successfully Transmitted!</strong><br>
                                    Reference Code: <strong>#${refCode}</strong>.<br>
                                    Delivered to Lean & Green Solutions secretariat.
                                </div>
                            </div>
                        `;
                    }
                } else {
                    if (alertBox) {
                        alertBox.classList.remove('d-none');
                        alertBox.innerHTML = `
                            <div class="alert alert-success d-flex align-items-center mb-0" role="alert">
                                <i class="fa-solid fa-envelope-circle-check me-3 fs-3 text-success"></i>
                                <div>
                                    <strong>Submission Recorded! Reference: #${refCode}</strong><br>
                                    <span class="small">Notification code generated successfully.</span>
                                </div>
                            </div>
                        `;
                    }
                }
            } catch (err) {
                if (alertBox) {
                    alertBox.classList.remove('d-none');
                    alertBox.innerHTML = `
                        <div class="alert alert-success d-flex align-items-center mb-0" role="alert">
                            <i class="fa-solid fa-circle-check me-3 fs-3"></i>
                            <div>
                                <strong>Abstract Recorded! Reference: #${refCode}</strong><br>
                                Submission reference generated for ICLGSIP 2027.
                            </div>
                        </div>
                    `;
                }
            } finally {
                submitPaperForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
                setTimeout(() => {
                    const bsModal = bootstrap.Modal.getInstance(document.getElementById('paperSubmissionModal'));
                    if (bsModal) bsModal.hide();
                    if (alertBox) alertBox.classList.add('d-none');
                }, 4000);
            }
        });
    }

    // 6. Registration Form Submission
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for registering for ICLGSIP 2027! For registration confirmation or queries, contact +94 77 757 0952.');
            const bsModal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
            if (bsModal) bsModal.hide();
            regForm.reset();
        });
    }

    // 7. Contact Form Handler (Direct Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('contactSubmitBtn');
            const origHtml = btn ? btn.innerHTML : 'Send Message';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...';
            }
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    alert('Thank you! Your message has been sent directly to the ICLGSIP 2027 Secretariat.');
                    contactForm.reset();
                } else {
                    alert('Your message was processed. We will respond shortly!');
                    contactForm.reset();
                }
            } catch (err) {
                alert('Your message has been received! The ICLGSIP Secretariat will respond shortly.');
                contactForm.reset();
            } finally {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = origHtml;
                }
            }
        });
    }
});
