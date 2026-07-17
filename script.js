const errorBox = document.getElementById("errorBox");

function showError(message) {
    errorBox.style.display = "block";
    errorBox.innerHTML = message;
}

function hideError() {
    errorBox.style.display = "none";
}

function allowEnrollment(e) {

    const key = e.key;

    if (
        /^[a-zA-Z0-9]$/.test(key) ||
        key === "Backspace" ||
        key === "Delete" ||
        key === "ArrowLeft" ||
        key === "ArrowRight" ||
        key === "Tab"
    ) {
        return true;
    }

    e.preventDefault();
    return false;
}



// --- GLOBAL VARIABLE ---

const btn = document.querySelector('.btn-submit');
const successBox = document.getElementById('successArea');
const finalLinkBtn = document.getElementById('finalLinkBtn');

function generateResult() {
    hideError();
    const enrollment = document.getElementById('enrollment').value.trim();
    // Ab hum direct text value le rahe hain
    const dobInput = document.getElementById('dob').value.trim();


    // 1. Validation Check
    if (!enrollment || !dobInput) {
        showError("Enrollment Number aur DOB bharna zaroori hai.");
        return;
    }

    // Check: DOB me '/' hai ya nahi?
    if (!dobInput.includes("/")) {

        return;
    }

    // 2. Button Animation
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Connecting to Server... <i class="fas fa-spinner fa-spin"></i>';
    btn.style.opacity = "0.7";

    setTimeout(() => {

        try {
            // 3. Encoding Logic
            const encodedEnrollment = btoa(enrollment);

            // Directly encode jo user ne type kiya
            // .replace logic zaroori hai "=" error ke liye
            const encodedDOB = btoa(dobInput).replace(/=/g, "%3D");

            // 4. Create Final Link
            const targetURL = `https://test.bteupexam.co.in/odd_Semester/main/result.aspx?id=${encodedEnrollment}&id2=${encodedDOB}`;

            // Set Link
            finalLinkBtn.href = targetURL;

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

btn.addEventListener("click", generateResult);


$(function () {

    $('#dob').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        endDate: new Date(),
        orientation: "bottom"
    });

});