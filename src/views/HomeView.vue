<template>
  <div class="container text-center">
    <h1>Pendaftaran UKM Programming Club</h1>
    <h2>Institut Teknologi Tangerang Selatan</h2>
    <p>Untuk Mahasiswa Institut Teknologi Tangerang Selatan</p>
  </div>
  <!-- Form -->
  <form class="container mt-4" @submit.prevent="addData">
    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <label for="inputName4" class="form-label">Nama</label>
          <input v-model="newNamaContent" type="text" class="form-control" id="inputName4">
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="inputEmail4" class="form-label">Email</label>
          <input v-model="newEmailContent" type="email" class="form-control" id="inputEmail4">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="reason" class="form-label">Alasan Masuk Programming Club</label>
      <textarea v-model="newAlasanContent" class="form-control" id="reason" rows="5"></textarea>
    </div>
    <div class="mb-3">
      <label>Ketik karakter ini</label>
      <div class="input-group">
        <VueClientRecaptcha
          :value="inputValue"
          @getCode="getCaptchaCode"
          @isValid="checkValidCaptcha"
        />
        <input class="form-control" type="text" v-model="inputValue" />
      </div>
    </div>
    <div class="mb-3">
      <button :disabled="!newNamaContent || !newEmailContent || !newAlasanContent || !captchaValidated" type="submit"
        class="btn btn-primary">Kirim</button>
    </div>
  </form>
  <!-- Form -->

  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" v-if="showModal" @click="closeModal">
    <div class="modal-dialog modal-dialog-centered modal-top-right" role="document">
      <div class="modal-content bg-blue">
        <div class="modal-header">
          <h5 class="modal-title text-white">Terima Kasih!</h5>
          <button type="button" class="btn-close text-white" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p class="text-white">Anda telah berhasil mendaftar di UKM Programming Club!</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
</template>

<script>
import { ref, reactive } from 'vue'
import { collection, addDoc } from '@firebase/firestore';
import { db } from '@/firebase'
import VueClientRecaptcha from "vue-client-recaptcha";

export default {
  components: {
    VueClientRecaptcha,
  },
  setup() {
    let captchaValidated = ref(false);
    /* pass value to captcha  */
    const inputValue = ref(null);
    const showModal = ref(false); // To control the modal visibility

    const data = reactive({
      captchaCode: null,
      isValid: false,
    });
    const getCaptchaCode = (value) => {
      /* you can access captcha code */
      data.captchaCode = value;
    };
    const checkValidCaptcha = (value) => {
      /* expected return boolean if your value and captcha code are same return True otherwise return False */
      data.isValid = value;
      if (value) {
        captchaValidated.value = true;
        console.log(value);
      }
    };

    const newNamaContent = ref('');
    const newEmailContent = ref('');
    const newAlasanContent = ref('');

    const addData = () => {
      addDoc(collection(db, "datas"), {
        nama: newNamaContent.value,
        email: newEmailContent.value,
        reason: newAlasanContent.value
      });

      // Clear form inputs after successful registration
      newNamaContent.value = "";
      newEmailContent.value = "";
      newAlasanContent.value = "";

      // Show the modal
      showModal.value = true;

      // Reload the page after 3 seconds
      setTimeout(() => {
        location.reload();
      }, 3000);
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      inputValue,
      data,
      getCaptchaCode,
      checkValidCaptcha,
      captchaValidated,
      newNamaContent,
      newEmailContent,
      newAlasanContent,
      addData,
      showModal,
      closeModal,
    };
  }
};
</script>

<style>
@import url("/node_modules/vue-client-recaptcha/dist/style.css");

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-bottom: 40px;
}

.form-control {
  border-radius: 8px;
}

textarea.form-control {
  resize: vertical;
}

.input-group {
  margin-top: 10px;
}

.btn-primary {
  font-size: 16px;
  padding: 10px 30px;
}

/* Improve modal styling */
.modal {
  display: flex !important;
  align-items: flex-start;
}

.modal-dialog {
  max-width: 400px;
  margin-top: 20px; /* Increased the top margin to move the modal higher up */
}

.modal-content {
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-top-right {
  position: absolute;
  right: 20px;
  top: 20px;
}

.bg-blue {
  background-color: #007bff; /* Blue color */
}

.text-white {
  color: #fff; /* White color */
}

.btn-close {
  color: #fff; /* White color */
}
</style>
