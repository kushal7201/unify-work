document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Fetch values
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const country = document.getElementById("country").value;
    const address = document.getElementById("address").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const email = document.getElementById("email").value.trim();

    const genderElem = document.querySelector('input[name="gender"]:checked');
    const techElems = document.querySelectorAll('.tech:checked');

    // Validation
    if (!name || !age || !genderElem || !country || !address || !telephone || !email || techElems.length === 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (isNaN(age) || age <= 0 || age>100) {
      alert("Age must be a valid whole number");
      return;
    }

    if (!/^\d{10}$/.test(telephone)) {
      alert("Telephone must be a 10-digit number.");
      return;
    }

    // Collect multiple values
    const gender = genderElem.value;
    const techStack = Array.from(techElems).map(t => t.value).join(", ");

    // Display result in table
    document.getElementById("result").innerHTML = `
      <h3>Submitted Data</h3>
      <table>
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>Name</td><td>${name}</td></tr>
        <tr><td>Age</td><td>${age}</td></tr>
        <tr><td>Gender</td><td>${gender}</td></tr>
        <tr><td>Country</td><td>${country}</td></tr>
        <tr><td>Tech Stack</td><td>${techStack}</td></tr>
        <tr><td>Address</td><td>${address.replace(/\n/g, "<br>")}</td></tr>
        <tr><td>Telephone</td><td>${telephone}</td></tr>
        <tr><td>Email</td><td>${email}</td></tr>
      </table>
    `;
  });