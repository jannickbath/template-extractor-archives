document.querySelectorAll(".{template_name} .mobile-toggle").forEach(toggleButton => {
    toggleButton.onclick = () => {
        const navigations = document.querySelectorAll(".{template_name} .navigation");

        navigations.forEach(nav => {
            nav.classList.toggle("active");
        })
    }
});

document.querySelectorAll(".{template_name} .article-redirect").forEach(article => {
    article.onclick = () => {
        document.querySelectorAll(".{template_name} .navigation.active").forEach(navModule => {
            navModule.classList.remove("active");
        })
    }
})

setTimeout(() => {
    document.querySelectorAll('.{template_name} .preload').forEach(el => el.classList.remove('preload'));
}, 500);
