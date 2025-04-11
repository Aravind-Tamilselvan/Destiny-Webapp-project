export const toggleContent = (element) => {
    if (!element) {
        console.log("element is not got")
        return
    };

    let answer = element.nextElementSibling;
    let icon = element.querySelector(".icon");

    if (!answer) {
        console.log("answer element not got")
        return
    };


    answer.style.display = answer.style.display === "block" ? "none" : "block";


    if (icon.style.transform === "rotate(180deg)") {
        icon.style.transform = "rotate(0deg)";
    } else {
        icon.style.transform = "rotate(180deg)";
    }
};