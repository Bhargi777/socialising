const loginForm = document.getElementById('loginForm');
const otpForm = document.getElementById('otpForm');
const otpSection = document.getElementById('otp');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const rollNo = document.getElementById('rollNo').value;

  const response = await fetch('http://localhost:3000/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollNo })
  });

  if (response.ok) {
    alert('OTP sent to your registered phone number.');
    loginForm.style.display = 'none';
    otpSection.style.display = 'block';
  } else {
    alert('Error: Unable to send OTP. Please check your roll number.');
  }
});

otpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const otp = document.getElementById('otpInput').value;

  const response = await fetch('http://localhost:3000/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otp })
  });

  if (response.ok) {
    alert('Login successful!');
    window.location.href = '/dashboard';
  } else {
    alert('Invalid or expired OTP.');
  }
});
