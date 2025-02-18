document.addEventListener("DOMContentLoaded", function() {
    let completedButtons = JSON.parse(localStorage.getItem("completedButtons")) || {};

    for (let i = 1; i <= 3; i++) {
        let button = document.querySelector(`#btn${i} button`);
        let loader = button.querySelector(".loader");

        if (completedButtons[i]) {
            button.innerHTML = "✔ সম্পন্ন";
            button.classList.add("completed");
            button.disabled = true;
        } else if (localStorage.getItem(`returningFrom${i}`) === "true") {
            // ইউজার ব্যাক করে আসলে লোডিং দেখাবে
            loader.style.display = "inline-block"; 
            button.disabled = true;

            setTimeout(() => {
                loader.style.display = "none";
                button.innerHTML = "✔ সম্পন্ন";
                button.classList.add("completed");
                completedButtons[i] = true;
                localStorage.setItem("completedButtons", JSON.stringify(completedButtons));
                localStorage.removeItem(`returningFrom${i}`);

                // যদি তিনটি বাটন কমপ্লিট হয়, তবে ৪ নম্বর বাটন চালু হবে
                if (Object.keys(completedButtons).length === 3) {
                    document.querySelector("#finalBtn button").disabled = false;
                }
            }, 5000);
        }
    }

    // যদি তিনটি বাটন আগেই কমপ্লিট থাকে, তবে ৪ নম্বর বাটন চালু হবে
    if (Object.keys(completedButtons).length === 3) {
        document.querySelector("#finalBtn button").disabled = false;
    }
});

function processButton(event, buttonNumber) {
    // লোকাল স্টোরেজে মার্ক করে রাখা যে ইউজার বাইরে গেল
    localStorage.setItem(`returningFrom${buttonNumber}`, "true");
}
