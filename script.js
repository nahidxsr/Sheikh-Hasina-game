document.addEventListener("DOMContentLoaded", function() {
    let completedButtons = JSON.parse(localStorage.getItem("completedButtons")) || {};
    let timestamp = localStorage.getItem("timestamp");

    // যদি ২ মিনিট (120 সেকেন্ড) পেরিয়ে গেছে, তাহলে ডেটা ডিলিট হবে
    if (timestamp && (Date.now() - timestamp > 120000)) {
        localStorage.removeItem("completedButtons");
        localStorage.removeItem("timestamp");
        completedButtons = {};
    }

    for (let i = 1; i <= 3; i++) {
        let button = document.querySelector(`#btn${i} button`);
        let loader = button.querySelector(".loader");

        if (completedButtons[i]) {
            button.innerHTML = "✔ সম্পন্ন";
            button.classList.add("completed");
            button.disabled = true;
        } else if (localStorage.getItem(`returningFrom${i}`) === "true") {
            // ইউজার ব্যাক করে আসলে ৫ সেকেন্ড লোডিং দেখাবে
            loader.style.display = "inline-block"; 
            button.disabled = true;

            setTimeout(() => {
                loader.style.display = "none";
                button.innerHTML = "✔ সম্পন্ন";
                button.classList.add("completed");
                completedButtons[i] = true;
                localStorage.setItem("completedButtons", JSON.stringify(completedButtons));
                localStorage.setItem("timestamp", Date.now()); // আপডেট করে timestamp সেভ করা
                localStorage.removeItem(`returningFrom${i}`);

                // যদি তিনটি বাটন কমপ্লিট হয়, তবে ৪ নম্বর বাটন চালু হবে
                if (Object.keys(completedButtons).length === 3) {
                    document.querySelector("#finalBtn button").disabled = false;
                }
            }, 5000); // ৫ সেকেন্ড লোডিং হবে
        }
    }

    // যদি তিনটি বাটন আগেই কমপ্লিট থাকে, তবে ৪ নম্বর বাটন চালু হবে
    if (Object.keys(completedButtons).length === 3) {
        document.querySelector("#finalBtn button").disabled = false;
    }
});

function processButton(event, buttonNumber) {
    // বাটনে ক্লিক করলে, ৫ সেকেন্ড লোডিং হবে
    let button = document.querySelector(`#btn${buttonNumber} button`);
    let loader = button.querySelector(".loader");

    // লোডিং চালু
    loader.style.display = "inline-block";
    button.disabled = true;

    // লোকাল স্টোরেজে মার্ক করে রাখা যে ইউজার বাইরে গেল
    localStorage.setItem(`returningFrom${buttonNumber}`, "true");
}
