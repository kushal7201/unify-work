// simple JS for form actions — keeps UX close to the design
const form = document.getElementById('personalForm');
const resetBtn = document.getElementById('resetBtn');


resetBtn.addEventListener('click', () => {
    form.reset();
    // move focus to first field
    form.querySelector('[name="name"]').focus();
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());
    alert('Submitted — open console to see data.');
    console.log('Form submission:', obj);
})