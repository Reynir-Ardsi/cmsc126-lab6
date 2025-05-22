function generateAdventurerID() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit
}

function registerAdventurer() {
    const name = document.getElementById("name").value.trim();
    const level = document.getElementById("level").value.trim();
    const cls = document.getElementById("class").value.trim();
    const guild = document.getElementById("guild").value.trim();

    if (!name || !level || !cls || !guild) {
    alert("Please fill in all fields.");
    return;
}

    const formData = new FormData();
    formData.append("Adventurer_ID", generateAdventurerID());
    formData.append("Name", name);
    formData.append("Level", level);
    formData.append("Class", cls);
    formData.append("Guild_Affiliation", guild);

    fetch("lab6.php", {
    method: "POST",
    body: formData
    })
    .then(res => res.text())
    .then(msg => {
    alert(msg);
    document.getElementById("guild_form").reset();
    })
    .catch(err => alert("Error: " + err));
}

function fetchAdventurers() {
fetch("lab6.php")
    .then(res => res.json())
    .then(data => {
    const container = document.getElementById("adventurer_list");
    if (data.length === 0) {
        container.innerHTML = "<p>No adventurers found.</p>";
        return;
    }

    let html = `<table border="1">
        <tr><th>ID</th><th>Name</th><th>Level</th><th>Class</th><th>Guild</th></tr>`;
    data.forEach(a => {
        html += `<tr>
            <td>${a.Adventurer_ID}</td>
            <td>${a.Name}</td>
            <td>${a.Level}</td>
            <td>${a.Class}</td>
            <td>${a.Guild_Affiliation}</td>
        </tr>`;
    });
    html += "</table>";
    container.innerHTML = html;
    })
    .catch(err => alert("Failed to fetch adventurers: " + err));
}
