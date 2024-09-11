document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const apiMessage = document.getElementById('apiMessage');
    
    let valid = true;
    
    // Clear error messages
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    
    // Validation
    if (!email) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        valid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.display = 'block';
        valid = false;
    }

    if (!password) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        valid = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.style.display = 'block';
        valid = false;
    }

    if (valid) {
        // Save login info if "Remember Me" is checked
        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }

        // API Call
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });

            const result = await response.json();

            if (response.ok) {
                apiMessage.textContent = 'Login successful!';
                apiMessage.style.color = 'green';
            } else {
                apiMessage.textContent = 'Login failed, please try again.';
                apiMessage.style.color = 'red';
            }

        } catch (error) {
            apiMessage.textContent = 'Something went wrong. Please try again later.';
            apiMessage.style.color = 'red';
        }

        apiMessage.style.display = 'block';
    }
});

// Show/Hide Password toggle
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
});

// Check if user info exists in localStorage
window.onload = function () {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    
    if (savedEmail && savedPassword) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('password').value = savedPassword;
        document.getElementById('rememberMe').checked = true;
    }
};

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
