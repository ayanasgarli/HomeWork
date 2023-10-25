let accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item, index) => {
    let header = item.querySelector(".accordion-header");
    let content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
        item.classList.toggle("active");
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }

        accordionItems.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
                otherItem.classList.remove("active");
                otherItem.querySelector(".accordion-content").style.display = "none";
            }
        });
    });
});

