function sendRequestInfo(jmbag) {
  fetch(`/getStudentInfo?jmbag=${jmbag}`)
    .then(response => response.json())
    .then(studentInfo => {
      displayInfoTable(studentInfo);
    })
    .catch(error => {
      console.log("Error fetching student info: ", error);
    })
}

function displayInfoTable(studentInfo) {
  document.getElementById("overlay").style.display = "block";
  var toggle = document.getElementById("toggle");
  toggle.style.display = "block";
  var table = document.getElementById("info_table");
  table.innerHTML = "";

  var headerRow = table.insertRow();
  var headers = ["Ime", "Prezime", "E-mail", "JMBAG", "Naziv studija"];
  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement("th");
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }

  var row = table.insertRow();
  var columns = ["Ime", "Prezime", "Email", "JMBAG", "Naziv_studija"];
  for (var j = 0; j < columns.length; j++) {
    var cell = row.insertCell();
    cell.textContent = studentInfo[columns[j]];
  }
}

function Sakrij() {
  document.getElementById("overlay").style.display = "none";
}

function sendDeleteRequest(statusId) {
  fetch(`/deleteStatus/${statusId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const rowToDelete = document.getElementById(statusId).parentNode.parentNode;
        if (rowToDelete) {
          rowToDelete.parentNode.removeChild(rowToDelete);
        } else {
          console.log("Error while deleting.");
        }
      }
    })
    .catch((error) => {
      console.log("Error while deleting: ", error);
    })
}

function sendUpdateRequest(statusId) {
  const newOcjena = document.getElementById(`ocjena_${statusId}`).value;
  fetch(`/updateOcjena/${statusId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ocjena: newOcjena }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log('Updated.');
      } else {
        alert('Updating failed.');
      }
    })
    .catch((error) => {
      console.error('Error while updating:', error);
    });
}