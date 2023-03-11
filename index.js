const form = document.getElementById("registration-form");
      form.addEventListener("submit", function(event) {
        event.preventDefault(); // prevent page from reloading
        validateForm();
      });

      function validateForm() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = new Date(document.getElementById("dob").value);
        const age = (new Date() - dob) / (365 * 24 * 60 * 60 * 1000);
        const terms = document.getElementById("terms").checked;

        if (name === "") {
          alert("Please enter your name.");
          return false;
        }

        if (email === "") {
          alert("Please enter your email address.");
          return false;
        }

        if (password === "") {
          alert("Please enter a password.");
          return false;
        }

        if (age < 18 || age > 55) {
          alert("Please enter a valid date of birth (you must be between 18 and 55 years old).");
          return false;
        }

        if (!terms) {
          alert("Please accept the terms and conditions.");
          return false;
        }

        // If all validations pass, the form is valid
        localStorage.setItem("name",name);
        localStorage.setItem("email",email);
        localStorage.setItem("password",password);
        localStorage.setItem("dob",dob);
        localStorage.setItem("terms",terms);
        let obj = {
          name : localStorage.getItem("name"),
          email : localStorage.getItem("email"),
          password : localStorage.getItem("password"),
          dob : localStorage.getItem("dob"),
          terms : localStorage.getItem("terms")
        };
        localStorage.setItem("myobj",JSON.stringify(obj));
        let jsonString = localStorage.getItem("myobj");
        let obj1 = JSON.parse(jsonString);
        const table = document.getElementById("registration-table");
        const row = table.insertRow(-1);
        const nameCell = row.insertCell(0);
        const emailCell = row.insertCell(1);
        const passwordCell = row.insertCell(2);
        const dobCell = row.insertCell(3);
        const termsCell = row.insertCell(4);
        nameCell.innerHTML = obj1.name;
        emailCell.innerHTML = obj1.email;
        passwordCell.innerHTML = obj1.password;
        dobCell.innerHTML = obj1.dob;
        termsCell.innerHTML = obj1.terms ? "Yes" : "No";

        // Clear the form
        form.reset();

        return true;
      }