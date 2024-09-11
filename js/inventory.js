import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, get, onValue, set, remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Firebase configuration
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
const inventoryRef = ref(database, 'inventory'); // Reference to the 'inventory' node in Firebase

// Function to render inventory items
function renderInventory(items) {
    const inventoryListBody = document.getElementById('inventory-list-body');
    inventoryListBody.innerHTML = ''; // Clear the table body
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name || '-'}</td>
            <td>${item.quantity || '-'}</td>
            <td>${item.category || '-'}</td>
            <td>${item.batch || '-'}</td>
            <td>${item.expiry || '-'}</td>
            <td>${item.manufacturer || '-'}</td>
            <td>${item.price || '-'}</td>
            <td>${item.location || '-'}</td>
            <td>${item.supplier || '-'}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editItem('${item.key}', '${item.name || '-'}', ${item.quantity || 0}, '${item.category || '-'}', '${item.batch || '-'}', '${item.expiry || '-'}', '${item.manufacturer || '-'}', ${item.price || 0}, '${item.location || '-'}', '${item.supplier || '-'}')">Edit</button>
                <button class="remove-btn" onclick="deleteItem('${item.key}')">Remove</button>
            </td>
        `;
        inventoryListBody.appendChild(row); // Append each row to the table
    });
}

// Fetch inventory from Firebase and render in real-time
function fetchInventory() {
    onValue(inventoryRef, (snapshot) => {
        const inventory = [];
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val(); // Get the actual data from Firebase
            inventory.push({ ...data, key: childSnapshot.key }); // Add the data and key to the inventory array
        });
        renderInventory(inventory); // Call the render function to display the data
    });
}

// Add or update an item in the Firebase Realtime Database
window.addItem = function() {
    const itemName = document.getElementById('item-name').value.trim();
    const itemQuantity = parseInt(document.getElementById('item-quantity').value) || 0;
    const itemCategory = document.getElementById('item-category').value.trim();
    const itemBatch = document.getElementById('item-batch').value.trim();
    const itemExpiry = document.getElementById('item-expiry').value;
    const itemManufacturer = document.getElementById('item-manufacturer').value.trim();
    const itemPrice = parseFloat(document.getElementById('item-price').value) || 0;
    const itemLocation = document.getElementById('item-location').value.trim();
    const itemSupplier = document.getElementById('item-supplier').value.trim();

    if (itemName && itemQuantity && itemCategory && itemBatch && itemExpiry && itemManufacturer && itemPrice && itemLocation && itemSupplier) {
        // Check if the item already exists in the database
        get(inventoryRef).then((snapshot) => {
            let itemExists = false;
            let itemKey = null;
            let existingQuantity = 0;

            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (data.name.toLowerCase() === itemName.toLowerCase() && 
                    data.category.toLowerCase() === itemCategory.toLowerCase() &&
                    data.batch.toLowerCase() === itemBatch.toLowerCase()) {
                    itemExists = true;
                    itemKey = childSnapshot.key; // Get the Firebase key for the item
                    existingQuantity = data.quantity; // Get the existing quantity
                }
            });

            if (itemExists) {
                // Update the existing item by adding the new quantity
                const updatedQuantity = existingQuantity + itemQuantity;
                const itemRef = ref(database, `inventory/${itemKey}`); // Reference to the existing item
                set(itemRef, {
                    name: itemName,
                    quantity: updatedQuantity,
                    category: itemCategory,
                    batch: itemBatch,
                    expiry: itemExpiry,
                    manufacturer: itemManufacturer,
                    price: itemPrice,
                    location: itemLocation,
                    supplier: itemSupplier
                })
                .then(() => {
                    alert("Medicine quantity updated successfully!");
                    clearFormFields(); // Clear form fields after updating an item
                })
                .catch((error) => {
                    console.error("Error updating item: ", error);
                    alert("Error updating item. Please try again.");
                });
            } else {
                // Add a new item to the inventory
                const newItemRef = push(inventoryRef); // Create a new reference in the 'inventory' node
                set(newItemRef, {
                    name: itemName,
                    quantity: itemQuantity,
                    category: itemCategory,
                    batch: itemBatch,
                    expiry: itemExpiry,
                    manufacturer: itemManufacturer,
                    price: itemPrice,
                    location: itemLocation,
                    supplier: itemSupplier
                })
                .then(() => {
                    alert("Medicine added successfully!");
                    clearFormFields(); // Clear form fields after adding an item
                })
                .catch((error) => {
                    console.error("Error adding item: ", error);
                    alert("Error adding item. Please try again.");
                });
            }
        }).catch((error) => {
            console.error("Error fetching inventory: ", error);
        });
    } else {
        alert("Please fill out all fields.");
    }
};

// Clear form fields after adding/updating an item
function clearFormFields() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('item-category').value = '';
    document.getElementById('item-batch').value = '';
    document.getElementById('item-expiry').value = '';
    document.getElementById('item-manufacturer').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-location').value = '';
    document.getElementById('item-supplier').value = '';
    const addButton = document.querySelector('.add-item-form button');
    addButton.textContent = 'Add Medicine';
    addButton.onclick = window.addItem;
}

// Search items based on name, category, manufacturer, or supplier
window.searchItems = function() {
    const queryText = document.getElementById('search-input').value.toLowerCase();
    onValue(inventoryRef, (snapshot) => {
        const filteredItems = [];
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            if (item.name && item.name.toLowerCase().includes(queryText) || 
                item.category && item.category.toLowerCase().includes(queryText) ||
                item.manufacturer && item.manufacturer.toLowerCase().includes(queryText) ||
                item.supplier && item.supplier.toLowerCase().includes(queryText)) {
                filteredItems.push({ ...item, key: childSnapshot.key }); // Filter items based on the search query
            }
        });
        renderInventory(filteredItems); // Render the filtered results
    });
};

// Delete item
window.deleteItem = function(itemKey) {
    const itemRef = ref(database, `inventory/${itemKey}`);
    remove(itemRef)
        .then(() => {
            alert('Medicine deleted successfully!');
            fetchInventory(); // Reload the inventory after deletion
        })
        .catch((error) => {
            console.error('Error deleting item:', error);
            alert('There was an error deleting the medicine. Please try again.');
        });
};

// Edit item
window.editItem = function(itemKey, itemName, itemQuantity, itemCategory, itemBatch, itemExpiry, itemManufacturer, itemPrice, itemLocation, itemSupplier) {
    document.getElementById('item-name').value = itemName || '-';
    document.getElementById('item-quantity').value = itemQuantity || 0;
    document.getElementById('item-category').value = itemCategory || '-';
    document.getElementById('item-batch').value = itemBatch || '-';
    document.getElementById('item-expiry').value = itemExpiry || '-';
    document.getElementById('item-manufacturer').value = itemManufacturer || '-';
    document.getElementById('item-price').value = itemPrice || 0;
    document.getElementById('item-location').value = itemLocation || '-';
    document.getElementById('item-supplier').value = itemSupplier || '-';
    const addButton = document.querySelector('.add-item-form button');
    addButton.textContent = 'Update Medicine';
    addButton.onclick = () => {
        updateItem(itemKey);
    };
};

// Update item
// Update item
function updateItem(itemKey) {
    const itemName = document.getElementById('item-name').value.trim();
    const itemQuantity = parseInt(document.getElementById('item-quantity').value) || 0;
    const itemCategory = document.getElementById('item-category').value.trim();
    const itemBatch = document.getElementById('item-batch').value.trim();
    const itemExpiry = document.getElementById('item-expiry').value;
    const itemManufacturer = document.getElementById('item-manufacturer').value.trim();
    const itemPrice = parseFloat(document.getElementById('item-price').value) || 0;
    const itemLocation = document.getElementById('item-location').value.trim();
    const itemSupplier = document.getElementById('item-supplier').value.trim();

    if (itemName && itemQuantity && itemCategory && itemBatch && itemExpiry && itemManufacturer && itemPrice && itemLocation && itemSupplier) {
        const itemRef = ref(database, `inventory/${itemKey}`);
        set(itemRef, {
            name: itemName,
            quantity: itemQuantity,
            category: itemCategory,
            batch: itemBatch,
            expiry: itemExpiry,
            manufacturer: itemManufacturer,
            price: itemPrice,
            location: itemLocation,
            supplier: itemSupplier
        })
        .then(() => {
            alert('Medicine updated successfully!');
            clearFormFields(); // Clear form fields after updating an item
            
            // Reset button text and event handler
            const addButton = document.querySelector('.add-item-form button');
            addButton.textContent = 'Add Medicine';
            addButton.onclick = window.addItem;
            
            fetchInventory(); // Reload the inventory after updating
        })
        .catch((error) => {
            console.error('Error updating item:', error);
            alert('There was an error updating the medicine. Please try again.');
        });
    } else {
        alert('Please fill out all fields.');
    }
}


// Initialize inventory fetch
fetchInventory();
