# Hospease - Hospital Management System

## Project Overview

Hospease is a comprehensive web application designed to streamline and integrate various hospital management functions into a single, user-friendly interface. This hospital management system enhances the efficiency of healthcare administrators by automating and centralizing key hospital operations. From managing patient records to overseeing ambulance services, bed availability, and blood bank inventory, Hospease provides a robust solution to meet the diverse needs of a hospital environment.

## Key Features

### Patient Management

- **Add and Manage Patient Records:** Easily input and update patient information, including personal details, medical history, and contact information.
- **Appointment Scheduling:** Utilize the OPD Queue system to schedule and manage outpatient appointments, view patient details, and coordinate with healthcare providers.
- **Comprehensive Patient Details:** Access and review patient symptoms, doctor assignments, and other relevant information to ensure effective care.

### OPD Queue Management

- **Real-Time Appointment Management:** Track and manage outpatient appointments and queues efficiently.
- **View and Schedule Appointments:** Access detailed patient information and schedule new appointments seamlessly.

### Ambulance Service

- **Track Ambulance Availability:** Monitor and manage the availability of ambulances within the hospital network.
- **Manage Requests:** Handle requests for ambulance services and coordinate dispatches as needed.

### Bed Management

- **Manage Bed Availability:** Track and manage the availability of hospital beds to ensure efficient patient assignments.
- **Optimize Bed Utilization:** Ensure optimal use of available beds and streamline patient admissions and discharges.

### Blood Bank Management

- **Track Blood Inventory:** Monitor blood inventory levels, including available blood types and quantities.
- **Manage Donation Records:** Maintain and update records of blood donations to ensure a well-stocked blood bank.

### Inventory Management

- **Track Medical Supplies:** Manage and track inventory levels of medical supplies and equipment.
- **Stock Level Alerts:** Generate alerts for replenishment to prevent stockouts and ensure uninterrupted supply.

### Scheduling System

- **Manage Staff Schedules:** Schedule appointments for doctors and other medical staff, optimizing time slots for outpatient services.
- **Efficient Time Slot Management:** Coordinate schedules to maximize the availability of healthcare providers.

## Project Structure

### HTML Files

- **`add_patient.html`**: Interface for adding new patients to the system.
- **`ambulance.html`**: Manages ambulance availability and requests.
- **`bed.html`**: Tracks hospital bed availability.
- **`blood.html`**: Handles blood bank inventory.
- **`dashboard.html`**: Main dashboard for overseeing hospital operations.
- **`gemini.html`**: Additional system page for handling Gemini operations.
- **`inventory.html`**: Manages inventory of medical supplies.
- **`opdq.html`**: Manages the OPD queue system.
- **`schedulenew.html`**: Interface for scheduling new appointments.

### CSS Files

- **`css/add_patient.css`**: Styles the add patient page.
- **`css/ambulance.css`**: Styles the ambulance services page.
- **`css/bed.css`**: Styles the bed management page.
- **`css/blood.css`**: Styles the blood bank management page.
- **`css/dashboard.css`**: Styles the dashboard page.
- **`css/gemini.css`**: Styles the Gemini operations page.
- **`css/inventory.css`**: Styles the inventory management page.
- **`css/opdq.css`**: Styles the OPD queue management page.
- **`css/schedule.css`**: Styles the scheduling page.

### JavaScript Files

- **`js/add_patient.js`**: Handles form submissions for adding patients.
- **`js/ambulance.js`**: Manages ambulance service requests.
- **`js/bed.js`**: Handles bed management functionality.
- **`js/blood.js`**: Manages blood bank inventory.
- **`js/dashboard.js`**: Handles dashboard operations and data rendering.
- **`js/gemini.js`**: Handles Gemini-related functionalities.
- **`js/inventory.js`**: Manages inventory operations.
- **`js/opdq.js`**: Handles OPD queue management.
- **`js/schedule.js`**: Manages staff and patient appointment scheduling.

### Images

- Contains various images used in the interface such as icons, logos, and background images.

## Backend

- **Firebase**: Used for backend operations including database, authentication, and real-time data synchronization. The entire system is integrated with Firebase to manage data efficiently without the need for a separate server setup.

## Future Enhancements

- **Detailed Analytics Dashboard:** Integrate advanced analytics for better hospital management insights.
- **Role-Based Authentication:** Implement authentication for different user roles (e.g., admin, doctor, nurse).
- **Pharmacy Management:** Expand functionality to include pharmacy management features.
- **Real-Time Notifications:** Implement notifications for critical system events such as low stock and urgent ambulance requests.

## Contributing

If you want to contribute to Hospease, please follow these guidelines:

- **Fork the repository** and create a feature branch.
- **Commit your changes** and push to the feature branch.
- **Submit a pull request** with a detailed description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to all contributors and libraries used in this project. Your support and tools have been invaluable in developing Hospease.
