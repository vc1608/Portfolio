/* ==================== Menu Show ==================== */
const navToggle = document.getElementById('nav-toggle'),
    navMenu = document.getElementById('nav-menu'),
    header = document.getElementById('header')

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu')
    })
}

/* ==================== Hide menu on outside click==================== */
window.addEventListener('click', (e) => {
    if (!e.target.matches('.nav_menu') && !e.target.matches('.nav_list') && !e.target.matches('.nav_toggle_icon')) {
        if (navMenu.classList.contains('show-menu'))
            navMenu.classList.remove('show-menu')
    }
}, true)


window.addEventListener('scroll', () => {
    /* ==================== Header Shadow ==================== */
    /* if (window.pageYOffset > 0) {
        header.classList.add('header_shadow')
    } else {
        if (header.classList.contains('header_shadow'))
            header.classList.remove('header_shadow')
    } */

    /* ==================== Hide menu on scroll==================== */
    if (navMenu.classList.contains('show-menu'))
        navMenu.classList.remove('show-menu')
})

/* ==================== Hide menu on clicking links ==================== */
const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction));


/* ==================== Accordion Skills ==================== */
const skillContents = document.getElementsByClassName('skill_content'),
    skillHeaders = document.querySelectorAll('.skill_header')


function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillContents.length; i++) {
        skillContents[i].className = 'skill_content skill_close'
    }
    if (itemClass === 'skill_content skill_close') {
        this.parentNode.className = 'skill_content skill_open'
    }
}

skillHeaders.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})


/* ==================== Qualification Tabs ==================== */
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification_active')
        })
        target.classList.add('qualification_active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification_active')
        })
        tab.classList.add('qualification_active')
    })
})

/* ==================== Project Swiper ==================== */
let swiper = new Swiper(".project_swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-nxt",
        prevEl: ".swiper-button-pre",
    },
});


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active_link')
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active_link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll-up'); else scrollUp.classList.remove('show-scroll-up')
}
window.addEventListener('scroll', scrollUp)


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/*==================== Form Control ====================*/

const contactFormName = document.getElementById('name'),
    contactFormPhone = document.getElementById('phone'),
    namePattern = new RegExp("^[A-Za-z ']+$"),
    phonePattern = new RegExp("^[0-9]+$")

let previousNameValue = '',
    previousPhoneValue = ''


/*==================== Restrict Input to for Alphabets Only====================*/
contactFormName.addEventListener('input', (e) => {
    let currentNameValue = contactFormName.value

    if (e.inputType.includes('delete') || namePattern.test(currentNameValue)) {
        previousNameValue = currentNameValue
    }

    contactFormName.value = previousNameValue
})


/*==================== Restrict Input to for Numbers Only ====================*/
contactFormPhone.addEventListener('input', (e) => {
    let currentPhoneValue = contactFormPhone.value

    if (e.inputType.includes('delete')) {
        previousPhoneValue = currentPhoneValue
    } else if (previousPhoneValue.length < 10) {
        if (phonePattern.test(currentPhoneValue))
            previousPhoneValue = currentPhoneValue
    }

    contactFormPhone.value = previousPhoneValue
})


/*==================== Check Input Field for Empty Content ====================*/
let isEmpty = (inputField) => {
    if (inputField.value.trim() === '')
        return true

    return false
}

/*==================== Display Errors ====================*/
let showError = (inputField, errorMsg) => {
    const inputFieldParent = inputField.parentNode

    if (!inputFieldParent.classList.contains('input_error')) {
        let errorDiv = document.createElement('div')

        errorDiv.setAttribute('class', 'error_msg')
        errorDiv.textContent = errorMsg

        inputFieldParent.classList.add('input_error')

        inputFieldParent.insertAdjacentElement('afterend', errorDiv);
    } else {
        inputFieldParent.nextElementSibling.textContent = errorMsg
    }
}


/*==================== Remove Errors ====================*/
let removeError = (inputField) => {
    const inputFieldParent = inputField.parentNode

    if (inputFieldParent.classList.contains('input_error')) {
        inputFieldParent.classList.remove('input_error')

        inputFieldParent.nextElementSibling.remove()
    }
}


const inputName = document.getElementById('name'),
    inputEmail = document.getElementById('email'),
    inputPhone = document.getElementById('phone'),
    inputMsg = document.getElementById('message')

let emptyErrorMsg = ' is required'

/*==================== Validate Name ====================*/
let validateName = () => {
    if (isEmpty(inputName)) {
        showError(inputName, 'Name' + emptyErrorMsg)
        return false
    }

    return true
}

/*==================== Validate Email ====================*/
let validateEmail = () => {
    if (isEmpty(inputEmail)) {
        showError(inputEmail, 'Email' + emptyErrorMsg)
        return false
    }

    let emailFormat = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z]+)+$/

    if (!emailFormat.test(inputEmail.value.trim())) {
        showError(inputEmail, 'Invalid Email')
        return false
    }

    return true
}

/*==================== Validate Phone ====================*/
let validatePhone = () => {
    if (isEmpty(inputPhone)) {
        showError(inputPhone, 'Phone Number' + emptyErrorMsg)
        return false
    }

    if (inputPhone.value.trim().length < 10) {
        showError(inputPhone, 'Invalid Phone Number')
        return false
    }

    return true
}


/*==================== Validate Message ====================*/
let validateMessage = () => {
    if (isEmpty(inputMsg)) {
        showError(inputMsg, 'Message' + emptyErrorMsg)
        return false
    }
    return true
}


inputName.addEventListener('focusout', () => {
    if (validateName()) {
        removeError(inputName)
    }
})

inputEmail.addEventListener('focusout', () => {
    if (validateEmail()) {
        removeError(inputEmail)
    }
})

inputPhone.addEventListener('focusout', () => {
    if (validatePhone()) {
        removeError(inputPhone)
    }
})

inputMsg.addEventListener('focusout', () => {
    if (validateMessage()) {
        removeError(inputMsg)
    }
})


const submitBtn = document.getElementById('submit-button'),
    submitBtnContent = document.querySelector('#submit-button>span')

let addSubmitLoader = () => {
    if (!submitBtn.classList.contains('disabled')) {
        submitBtn.classList.add('disabled')
        submitBtnContent.style.opacity = 0

        let loaderElement = document.createElement('div')
        loaderElement.className = 'submit_loader'
        submitBtn.appendChild(loaderElement)
    }
}

let removeSubmitLoader = () => {
    if (submitBtn.classList.contains('disabled')) {
        let submitLoader = document.querySelector('.submit_loader')
        submitLoader.remove()

        submitBtn.classList.remove('disabled')
        submitBtnContent.style.opacity = 100
    }
}

function validateForm() {
    addSubmitLoader()

    let isValidName = validateName()
    let isValidEmail = validateEmail()
    let isValidPhone = validatePhone()
    let isValidMsg = validateMessage()

    if (isValidName && isValidEmail && isValidPhone && isValidMsg) {
        return true
    } else {
        setTimeout(removeSubmitLoader, 50)
        return false
    }
}

const contactForm = document.getElementById('contact-form'),
    errorAlert = '<i class="uil uil-exclamation-triangle"></i>&nbsp;&nbsp;Something Went Wrong for Submission. &nbsp;Please Retry',
    successAlert = '<i class="uil uil-check"></i>&nbsp;&nbsp;Thank you! &nbsp;Form Submited Successfully'

let showDataSubmissionAlert = (alertType) => {
    let alertElement = document.getElementById('alert')

    if (!alertElement) {
        alertElement = document.createElement('div')
        alertElement.id = 'alert'
        contactForm.prepend(alertElement)
    }

    if (alertType === 'error') {
        alertElement.className = 'error_data_submission'
        alertElement.innerHTML = errorAlert
    } else if (alertType === 'success') {
        alertElement.className = 'success_data_submission'
        alertElement.innerHTML = successAlert
        contactForm.reset()
    }

    alertElement.addEventListener('click', removeDataSubmissionAlert)
}


let removeDataSubmissionAlert = () => {
    let alertElement = document.getElementById('alert')
    if (alertElement) {
        alertElement.remove()
    }
}


var form = document.querySelector('.pageclip-form')

Pageclip.form(form, {
    onSubmit: validateForm,
    onResponse: function (error, response) {
        removeSubmitLoader()

        if (error) {
            showDataSubmissionAlert('error')
            setTimeout(removeDataSubmissionAlert, 60000)
        }

        if (response) {
            /* let responseData = JSON.parse(response)
            if (responseData['data'] === 'ok') {
                showDataSubmissionAlert('success')
                setTimeout(removeDataSubmissionAlert, 30000)
            } */
            showDataSubmissionAlert('success')
            setTimeout(removeDataSubmissionAlert, 30000)
        }
        return false
    }
})


const projectBlocks = document.querySelectorAll('.project_content'),
    projectModal = document.getElementById('project-modal'),
    projectModalTitle = document.getElementById('project-modal-title'),
    projectModalContent = document.getElementById('project-modal-content'),
    projectModalClose = document.querySelectorAll('.project_modal_close')

console.log(projectModal)
console.log(projectModalTitle)
console.log(projectModalContent)
console.log(projectModalClose)

projectBlocks.forEach(block => {
    block.addEventListener('click', (e) => {
        e.preventDefault()
        projectModal.style.display = 'flex'
        projectModalTitle.innerHTML = block.dataset.title
        document.body.style.overflow = 'hidden'
        //projectModalContent.innerHTML = '<iframe src ="' + block.dataset.url + '.html" frameBorder="0" width="100%" height="100%"></iframe>'
    })
})

let closeProjectModal = () => {
    projectModal.style.display = 'none'
    document.body.style.overflow = 'auto'
}


projectModalClose.forEach(btn => {
    btn.addEventListener('click', closeProjectModal)
});