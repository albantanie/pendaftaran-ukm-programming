<template>
  <div>
    <div v-if="showPasswordDialog" class="password-dialog">
      <label for="password">Masukkan Password Admin:</label>
      <input type="password" v-model="adminPassword" @keydown.enter="checkPassword" />
      <button @click="checkPassword" class="submit-btn">Submit</button>
    </div>
    <div v-else class="text-center">
      <h1>Hasil Pendaftaran</h1>
      <div class="table-responsive">
        <table class="table">
          <!-- Table Header -->
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Email</th>
              <th scope="col">Alasan</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody>
            <tr v-for="result in results" :key="result.id">
              <td>{{ result.nama }}</td>
              <td>{{ result.email }}</td>
              <td>{{ result.reason }}</td>
              <td>
                <button @click="confirmDeleteData(result.id)" class="btn">
                  <svg
                    style="color: red"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                    />
                  </svg>
                </button>
              </td>
              <td>
                <button @click="openModal(result)"  class="btn">
                  <svg
                    style="color: rgb(43, 245, 70)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Export button -->
      <button @click="exportToExcel" class="btn btn-primary">Export to Excel</button>
    </div>
    <!-- Modal -->
    <div v-if="selectedData" class="modal" id="editModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Update Data</h5>
            <button type="button" class="btn-close" data-bs-dismiss="#editModal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form class="form text-start">
              <label for="nama">Nama</label>
              <input ref="" class="form-control mb-2" type="text" placeholder="Nama" id="nama" v-model="selectedData.nama" />
              <label for="email">Email</label>
              <input ref="" class="form-control mb-2" type="text" placeholder="Email" id="email" v-model="selectedData.email" />
              <label for="alasan">Alasan</label>
              <input ref="" class="form-control mb-2" type="text" placeholder="Alasan" id="alasan" v-model="selectedData.reason" />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="#editModal" @click="closeModal">Tutup</button>
            <button @click="updateData(selectedData)" type="button" class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </template>

<script setup>
import { ref, watch } from 'vue';
import { db } from '@/firebase';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

const results = ref([]);
const showPasswordDialog = ref(true);
const adminPassword = ref('');
const selectedData = ref(null);
const showModal = ref(false); // Used for Vue approach to show/hide modal

// Fetch data from Firebase
onSnapshot(collection(db, 'datas'), (querySnapshot) => {
  const fbDatas = [];
  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      email: doc.data().email,
      nama: doc.data().nama,
      reason: doc.data().reason,
    };
    fbDatas.push(data);
  });
  results.value = fbDatas;
});

// Watch for changes in showPasswordDialog and clear adminPassword when showing the dialog again
watch(showPasswordDialog, (newVal) => {
  if (newVal) {
    adminPassword.value = '';
  }
});

// Confirm delete data
function confirmDeleteData(id) {
  if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    deleteData(id);
  }
}

// Delete data
async function deleteData(id) {
  await deleteDoc(doc(db, 'datas', id));
}

// Open the modal and set the selected data
function openModal(data) {
  selectedData.value = { ...data };
  showModal.value = true; // Vue approach to show the modal
}

// Update data
async function updateData(data) {
  await updateDoc(doc(db, 'datas', data.id), {
    nama: data.nama,
    email: data.email,
    reason: data.reason,
  });
  selectedData.value = null;
  showModal.value = false; // Hide the modal after updating data (Vue approach)
}

// Export data to Excel
function exportToExcel() {
  const worksheet = utils.json_to_sheet(results.value);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Data');

  const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'buffer' });
  const excelData = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(excelData, 'data.xlsx');
}

// Check admin password
function checkPassword() {
  const correctPassword = 'asdfasdf'; // Ganti dengan password admin yang benar

  if (adminPassword.value === correctPassword) {
    showPasswordDialog.value = false;
  } else {
    alert('Password yang Anda masukkan salah. Coba lagi.');
    adminPassword.value = '';
  }
}

function closeModal() {
  selectedData.value = null;
  showModal.value = false; // Hide the modal after updating data (Vue approach)
}
</script>

<style>
/* Your styles */
.password-dialog {
  max-width: 300px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.scroll-table {
  overflow-y: auto;
}

/* Styling for table on small screens */
@media screen and (max-width: 768px) {
  table {
    width: 100%;
  }

  th,
  td {
    white-space: nowrap;
  }
}
</style>
