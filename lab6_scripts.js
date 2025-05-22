let students = [];

function time_now() {
    const date = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const dayOfWeek = dayNames[date.getDay()];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let period = "";

    switch (true) {
        case (hours >= 12):
            period = "PM";
            break;
        default:
            period = "AM";
            break;
    }

    hours = (hours % 12) || 12;

    const timeString = `${hours}:${minutes} ${period}`;

    document.getElementById('date_display').innerText = `Today is ${month} ${day}, ${year}, ${dayOfWeek}. \n The current time is ${timeString}.`;
}

function generateStudentNumber() {
    let studentNumber;
    do {
        studentNumber = "2023" + Math.floor(10000 + Math.random() * 90000);
    } while (students.some(student => student.studentNumber === studentNumber));
    return studentNumber;
}

function validateInput(name, age, email) {
    let errors = [];

    if (!/^[a-zA-Z]+(\s[a-zA-Z](\.)?|\s[a-zA-Z]+)+$/i.test(name) || name.length <= 5) {
        errors.push("Please enter a full name (first and last name).");
    }

    if (isNaN(age) || age < 18 || age > 99) {
        errors.push("Age must be a number between 18 and 99.");
    }

    let emailParts = email.split("@");
    let emailName = emailParts[0];
    let emailDomain = emailParts[1];

    if (!emailName || emailName.trim() === "") {
        errors.push("Not a valid Email");
    } else if (!email.endsWith("@up.edu.ph")) {
        errors.push("Email must end with @up.edu.ph");
    }
    return errors;
}

function add_student() {
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("course").value;

    let validationErrors = validateInput(name, parseInt(age), email);
    if (validationErrors.length > 0) {
        alert(validationErrors.join("\n"));
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("course", course);

    fetch("lab6.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        document.getElementById("student_form").reset();
    })
    .catch(error => {
        alert("Error: " + error);
    });
}

function display_list() {
    fetch("lab6.php")
        .then(response => response.json())
        .then(data => {
            let studentList = document.getElementById("student_list");

            if (data.length === 0) {
                studentList.innerHTML = "<p>No students registered.</p>";
                return;
            }

            let tableHTML = `
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>UP Mail</th>
                        <th>Course</th>
                    </tr>`;

            data.forEach(student => {
                tableHTML += `
                    <tr>
                        <td>${student["Full Name"]}</td>
                        <td>${student.Age}</td>
                        <td>${student["UP-Mail"]}</td>
                        <td>${student.Course}</td>
                    </tr>`;
            });

            tableHTML += `</table>`;
            studentList.innerHTML = tableHTML;
        })
        .catch(error => {
            alert("Failed to load students: " + error);
        });
}


function find_student() {
    let searchID = document.getElementById("search_id").value.trim();
    let student = students.find(s => s.studentNumber === searchID);

    if (student) {
        document.getElementById("search_result").innerHTML = `
            <div class="student-info">
                <p><strong>Student Found:</strong></p>
                <div class="info-row"><strong>Student Number</strong> <span>${student.studentNumber}</span></div>
                <div class="info-row"><strong>Name</strong> <span>${student.name}</span></div>
                <div class="info-row"><strong>Age</strong> <span>${student.age}</span></div>
                <div class="info-row"><strong>UP Mail </strong> <span>${student.email}</span></div>
                <div class="info-row"><strong>Course</strong> <span>${student.course}</span></div>
            </div>
        `;
    } else {
        document.getElementById("search_result").innerText = "Student record does not exist.";
    }
}
