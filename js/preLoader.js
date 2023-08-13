window.addEventListener("load", function () {
    // Page has fully loaded, hide the loader
    document.querySelector(".pre-loader").style.display = "none";
});





window.addEventListener("beforeunload", function () {
    // Page is reloaded, show the loader
    document.querySelector(".pre-loader").style.display = "flex";
});