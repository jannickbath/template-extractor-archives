document.querySelectorAll(".mobile-toggle").forEach(toggleButton => {
    toggleButton.onclick = () => {
        const navigations = document.querySelectorAll(".mod_navigation");

        navigations.forEach(nav => {
            nav.classList.toggle("active");
        })
    }
});

setTimeout(() => {
    document.querySelectorAll('.preload').forEach(el => el.classList.remove('preload'));
}, 500);
