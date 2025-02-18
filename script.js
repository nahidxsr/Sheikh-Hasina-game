// লোকাল স্টোরেজ থেকে ডাটা রিস্টোর করার ফাংশন
document.addEventListener("DOMContentLoaded", function() {
    let completedButtons = JSON.parse(localStorage.getItem("completedButtons")) || {};
    
    for (let i = 1; i <= 3; i++) {
        if (completedButtons[i]) {
            let button = document.querySelector(`#btn${i} button`);
            button.innerHTML = "✔ সম্পন্ন";
            button.classList.add("completed");
            button.disabled = true;
        }
    }

    // যদি তিনটি বাটন আগেই কমপ্লিট থাকে, তবে ৪ নম্বর বাটন চালু হবে
    if (Object.keys(completedButtons).length === 3) {
        document.querySelector("#finalBtn button").disabled = false;
    }
});

function processButton(event, buttonNumber) {
    event.preventDefault(); // লিংকে সরাসরি না যাওয়ার জন্য
    
    let button = document.querySelector(`#btn${buttonNumber} button`);
    let link = document.getElementById('btn' + buttonNumber);
    let loader = button.querySelector(".loader");

    button.disabled = true;
    loader.style.display = "inline-block"; // লোডিং শুরু
    
    setTimeout(() => {
        loader.style.display = "none"; // লোডিং বন্ধ
        button.innerHTML = "✔ সম্পন্ন";
        button.classList.add("completed");

        // লোকাল স্টোরেজে সেভ করা
        let completedButtons = JSON.parse(localStorage.getItem("completedButtons")) || {};
        completedButtons[buttonNumber] = true;
        localStorage.setItem("completedButtons", JSON.stringify(completedButtons));

        // যদি তিনটি বাটন কমপ্লিট হয়, তবে ৪ নম্বর বাটন চালু হবে
        if (Object.keys(completedButtons).length === 3) {
            document.querySelector("#finalBtn button").disabled = false;
        }

        // লোডিং শেষ হলে লিংকে চলে যাবে
        window.location.href = link.href;
    }, 5000);
}
