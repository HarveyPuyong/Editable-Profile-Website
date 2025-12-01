const toggleTheme = () => {
  const toggleThemeBtn = document.querySelector('.toggle-theme-button');
  const body = document.querySelector('body');

  toggleThemeBtn.addEventListener('click', () => {
    toggleThemeBtn.classList.toggle('active');

    if(toggleThemeBtn.classList.contains('active')){
      toggleThemeBtn.classList.add('night-mode');
      toggleThemeBtn.classList.remove('light-mode');
      body.classList.add('night-mode');
      body.classList.remove('light-mode');
    }
    else{
      toggleThemeBtn.classList.add('light-mode');
      toggleThemeBtn.classList.remove('night-mode');
      body.classList.add('light-mode');
      body.classList.remove('night-mode');
    }
  });
}

toggleTheme();