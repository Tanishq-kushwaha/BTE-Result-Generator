// Navigation Logic
const list = document.querySelectorAll('.list');
function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) => item.addEventListener('click', activeLink));

// --- GLOBAL VARIABLE ---
var finalGeneratedLink = "";

function generateResult() {
    var enrollment = document.getElementById('enrollment').value.trim();
    // Ab hum direct text value le rahe hain
    var dobInput = document.getElementById('dob').value.trim();

    var btn = document.querySelector('.btn-submit');
    var successBox = document.getElementById('successArea');
    var finalLinkBtn = document.getElementById('finalLinkBtn');

    // 1. Validation Check
    if (enrollment === "" || dobInput === "") {
        alert("⚠️ Enrollment Number aur DOB bharna zaroori hai!");
        return;
    }

    // Check: DOB me '/' hai ya nahi?
    if (!dobInput.includes("/")) {
        alert("⚠️ Please enter Date in DD/MM/YYYY format (Example: 15/05/2002)");
        return;
    }

    // 2. Button Animation
    var originalText = btn.innerHTML;
    btn.innerHTML = 'Connecting to Server... <i class="fas fa-spinner fa-spin"></i>';
    btn.style.opacity = "0.7";

    setTimeout(function () {

        try {
            // 3. Encoding Logic (Ab Date convert nahi karni padegi)
            var encodedEnrollment = btoa(enrollment);

            // Directly encode jo user ne type kiya
            // .replace logic zaroori hai "=" error ke liye
            var encodedDOB = btoa(dobInput).replace(/=/g, "%3D");

            // 4. Create Final Link
            var targetURL = `https://result.bteexam.com/Odd_Semester/main/result.aspx?id=${encodedEnrollment}&id2=${encodedDOB}`;

            // Set Link
            finalLinkBtn.href = targetURL;
            finalGeneratedLink = targetURL;

            // 5. UI Update
            btn.innerHTML = originalText;
            btn.style.opacity = "1";
            btn.style.display = "none";
            successBox.style.display = "block";

        } catch (err) {
            alert("Error: " + err.message);
            btn.innerHTML = originalText;
        }

    }, 1000);
}