import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('patient-form');
    const inputs = document.querySelectorAll('input[type="text"], input[type="date"], select');
    const symptomsInput = document.getElementById('symptoms');
    const btnSubmit = document.querySelector('.btn-submit');
    const patientTable = document.getElementById('patient-table').querySelector('tbody');

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAiJ4KcaGSsLdYsQ-kiJ0AXVQoYk9JK-Vk",
        authDomain: "add-patient-8fba2.firebaseapp.com",
        projectId: "add-patient-8fba2",
        storageBucket: "add-patient-8fba2.appspot.com",
        messagingSenderId: "435197758365",
        appId: "1:435197758365:web:de80bb7bcf5caf47323d74"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const patientsRef = ref(database, 'patients');

    // Form submit event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;

        // Validate inputs
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '#ccc';
            }
        });

        // Validate symptoms input
        if (symptomsInput.value.trim() === '') {
            symptomsInput.style.borderColor = 'red';
            valid = false;
        } else {
            symptomsInput.style.borderColor = '#ccc';
        }

        if (!valid) {
            alert('Please fill out all required fields.');
            return;
        }

        // Collect patient data
        const patientData = {
            name: document.getElementById('name').value,
            phone_num: document.getElementById('phone_num').value,
            patient_relative_name: document.getElementById('patient_relative_name').value,
            patient_relative_contact: document.getElementById('patient_relative_contact').value,
            address: document.getElementById('address').value,
            prior_ailments: document.getElementById('prior_ailments').value,
            bed_num: document.getElementById('bed_num').value,
            dob: document.getElementById('dob').value,
            status: document.getElementById('status').value,
            doctor: document.getElementById('doctor').value,
            symptoms: symptomsInput.value
        };

        // Disable button and indicate processing
        btnSubmit.textContent = 'Adding Patient...';
        btnSubmit.disabled = true;

        // Push data to Firebase
        push(patientsRef, patientData)
            .then(() => {
                alert('Patient added successfully!');
                form.reset();
                btnSubmit.textContent = 'Add Patient';
                btnSubmit.disabled = false;
                addPatientToTable(patientData);
            })
            .catch(error => {
                console.error('Error adding patient:', error);
                alert('There was an error adding the patient. Please try again.');
                btnSubmit.textContent = 'Add Patient';
                btnSubmit.disabled = false;
            });
    });

    // Function to add patient data to table
    function addPatientToTable(patientData) {
        try {
            const row = patientTable.insertRow();
            row.insertCell(0).innerText = patientData.name || 'N/A';
            row.insertCell(1).innerText = patientData.phone_num || 'N/A';
            row.insertCell(2).innerText = patientData.patient_relative_name || 'N/A';
            row.insertCell(3).innerText = patientData.patient_relative_contact || 'N/A';
            row.insertCell(4).innerText = patientData.address || 'N/A';
            row.insertCell(5).innerText = patientData.prior_ailments || 'N/A';
            row.insertCell(6).innerText = patientData.bed_num || 'N/A';
            row.insertCell(7).innerText = patientData.dob || 'N/A';
            row.insertCell(8).innerText = patientData.status || 'N/A';
            row.insertCell(9).innerText = patientData.doctor || 'N/A';
            const symptomsCell = row.insertCell(10);
            symptomsCell.innerText = patientData.symptoms ? patientData.symptoms : 'None';
            symptomsCell.style.whiteSpace = "pre-wrap";
        } catch (error) {
            console.error("Error adding patient to table:", error);
        }
    }

    // Fetch data from Firebase and populate table
    function read() {
        get(patientsRef)
            .then(snapshot => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    Object.values(data).forEach(addPatientToTable);
                } else {
                    console.log("No data available");
                }
            })
            .catch(error => {
                console.error("Error reading data:", error);
            });
    }

    // Load existing patient data
    read();
});
