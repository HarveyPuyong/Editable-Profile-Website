const toggleTheme = () => {
  const toggleThemeBtn = document.querySelector('.toggle-theme-button');
  const body = document.querySelector('body');

  // --- Load saved theme on page load ---
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'night') {
    toggleThemeBtn.classList.add('active', 'night-mode');
    body.classList.add('night-mode');
  } else {
    toggleThemeBtn.classList.add('light-mode');
    body.classList.add('light-mode');
  }

  // --- Toggle Theme on Click ---
  toggleThemeBtn.addEventListener('click', () => {
    toggleThemeBtn.classList.toggle('active');

    if (toggleThemeBtn.classList.contains('active')) {
      // Night Mode
      toggleThemeBtn.classList.add('night-mode');
      toggleThemeBtn.classList.remove('light-mode');
      body.classList.add('night-mode');
      body.classList.remove('light-mode');

      localStorage.setItem('theme', 'night'); // SAVE
    } else {
      // Light Mode
      toggleThemeBtn.classList.add('light-mode');
      toggleThemeBtn.classList.remove('night-mode');
      body.classList.add('light-mode');
      body.classList.remove('night-mode');

      localStorage.setItem('theme', 'light'); // SAVE
    }
  });
};

toggleTheme();
