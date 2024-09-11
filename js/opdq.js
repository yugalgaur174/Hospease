import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAiJ4KcaGSsLdYsQ-kiJ0AXVQoYk9JK-Vk",
    authDomain: "add-patient-8fba2.firebaseapp.com",
    projectId: "add-patient-8fba2",
    storageBucket: "add-patient-8fba2.appspot.com",
    messagingSenderId: "435197758365",
    appId: "1:435197758365:web:de80bb7bcf5caf47323d74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const queueRef = ref(database, 'queue');
const patientRef = ref(database, 'patients');

// Array to hold the queue data and patient data
let queueData = [];
let patientData = [];

// Fetch and display queue data
function fetchQueueData() {
    onValue(queueRef, (snapshot) => {
        queueData = [];
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            queueData.push(data);
        });
        updateQueueTable();
    });
}

// Fetch and display patient data
function fetchPatientData() {
    return new Promise((resolve, reject) => {
        onValue(patientRef, (snapshot) => {
            patientData = [];
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                patientData.push(data);
            });
            resolve(patientData);
        }, { onlyOnce: true });
    });
}

// Update queue table
function updateQueueTable() {
    const tbody = document.querySelector('#queueTable tbody');
    tbody.innerHTML = '';
    queueData.forEach((item) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = item.name || 'N/A';
        row.insertCell(1).textContent = item.priorAilments || 'N/A';
        row.insertCell(2).textContent = item.appointmentTime || 'N/A';
        row.insertCell(3).textContent = item.doctor || 'N/A';
    });
}

// Update patient table
function updatePatientTable() {
    const tbody = document.querySelector('#patientTable tbody');
    tbody.innerHTML = ''; // Clear existing table rows

    fetchPatientData().then(patientData => {
        patientData.forEach(patient => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = patient.patient_id || 'N/A'; // Display patient ID
            row.insertCell(1).textContent = patient.name || 'N/A';
            row.insertCell(2).textContent = patient.prior_ailments || 'N/A';
            row.insertCell(3).textContent = patient.dob || 'N/A';
            row.insertCell(4).textContent = patient.symptoms || 'N/A';
            row.insertCell(5).textContent = patient.doctor || 'N/A';

            const actionsCell = row.insertCell(6);
            const addButton = document.createElement('button');
            addButton.textContent = 'Add Appointment';
            addButton.addEventListener('click', () => openAppointmentModal(patient));
            actionsCell.appendChild(addButton);
        });
    }).catch(error => {
        console.error('Error fetching patient data:', error);
    });
}

// Update doctor queue table
function updateDoctorQueueTable(doctor) {
    const tbody = document.querySelector('#doctorQueueTable tbody');
    tbody.innerHTML = '';

    // Filter queue data by doctor
    const filteredQueueData = queueData.filter(item => item.doctor === doctor);

    filteredQueueData.forEach((item) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = item.priorAilments || 'N/A';
        row.insertCell(1).textContent = item.patientName || 'N/A';
        row.insertCell(2).textContent = item.appointmentTime || 'N/A';
    });
}

// Open appointment modal
function openAppointmentModal(patient) {
    document.getElementById('modalPatientId').value = patient.patient_id || '';
    document.getElementById('modalPatientIdLabel').textContent = `Patient ID: ${patient.patient_id || 'N/A'}`;
    document.getElementById('modalPatientName').textContent = `Patient Name: ${patient.name || 'N/A'}`;
    document.getElementById('modalPriorAilments').textContent = `Prior Ailments: ${patient.prior_ailments || 'N/A'}`;
    document.getElementById('modalDOB').textContent = `Date of Birth: ${patient.dob || 'N/A'}`;
    document.getElementById('modalSymptoms').textContent = `Symptoms: ${patient.symptoms || 'N/A'}`;
    document.getElementById('modalDoctorName').textContent = `Doctor: ${patient.doctor || 'N/A'}`;
    document.getElementById('appointmentModal').style.display = 'block';
}

// Close appointment modal
document.querySelector('.modal .close').addEventListener('click', () => {
    document.getElementById('appointmentModal').style.display = 'none';
});

// Submit appointment form
document.getElementById('appointmentModalForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const patientId = document.getElementById('modalPatientId').value;
    const appointmentTime = document.getElementById('modalAppointmentTime').value;
    const doctorName = document.getElementById('modalDoctorName').textContent.replace('Doctor: ', '');

    const patientDetails = {
        id: patientId,
        name: document.getElementById('modalPatientName').textContent.replace('Patient Name: ', ''),
        priorAilments: document.getElementById('modalPriorAilments').textContent.replace('Prior Ailments: ', ''),
        dob: document.getElementById('modalDOB').textContent.replace('Date of Birth: ', ''),
        symptoms: document.getElementById('modalSymptoms').textContent.replace('Symptoms: ', ''),
        doctor: doctorName,
        appointmentTime: appointmentTime
    };

    if (patientId && appointmentTime && doctorName) {
        push(queueRef, patientDetails).then(() => {
            alert('Appointment added successfully!');
            document.getElementById('appointmentModal').style.display = 'none';
            fetchQueueData(); // Refresh the queue data
        }).catch((error) => {
            console.error('Error adding appointment:', error);
            alert('Failed to add appointment.');
        });
    } else {
        alert('Please fill in all fields.');
    }
});

// Switch between tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const targetTab = e.target.getAttribute('data-tab');

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        e.target.classList.add('active');
        document.getElementById(`${targetTab}Section`).classList.add('active');

        if (targetTab === 'queue') {
            fetchQueueData();
        } else if (targetTab === 'patient') {
            updatePatientTable();
        } else if (targetTab === 'doctorQueue') {
            updateDoctorQueueTable(document.getElementById('doctorSelect').value);
        }
    });
});

// Fetch and populate doctor options
function populateDoctorOptions() {
    const doctorSelect = document.getElementById('doctorSelect');
    const doctors = [...new Set(patientData.map(p => p.doctor))];

    doctorSelect.innerHTML = ''; // Clear existing options
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor;
        option.textContent = doctor;
        doctorSelect.appendChild(option);
    });
}

// Handle doctor queue filter
document.getElementById('doctorFilterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDoctor = document.getElementById('doctorSelect').value;
    if (selectedDoctor) {
        updateDoctorQueueTable(selectedDoctor);
    }
});

// Initial data fetch
fetchQueueData();
fetchPatientData().then(() => {
    updatePatientTable();
    populateDoctorOptions();
});
