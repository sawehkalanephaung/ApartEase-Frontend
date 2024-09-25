<template>
  <div class="flex flex-col items-center justify-center h-screen px-6 bg-white md:flex-row">
    <!-- Image Section -->
    <div class="flex items-center justify-center p-8 img md:w-1/2">
    <img src="@/assets/imgs/bg.svg" alt="Background Image" class="w-full h-auto" />
    </div>

    <!-- Login Form Section  -->
    <div class="w-full p-6 bg-white rounded-md md:w-1/2 lg:w-2/5">

      <Form @submit="login" :validation-schema="schema" class="mt-10"  >
        <div class="flex justify-center">
          <img src="@/assets/imgs/avatar.svg" alt="Avatar" class="h-24" />
         </div>
         <div class="flex items-center justify-center mt-6">
        <span class="mb-4 text-2xl font-semibold text-gray-700">Login Account</span>
      </div>
      <!-- Username -->
        <div class="mb-4">
          <label class="block font-medium lg:text-lg text-slate-700">Username</label>
          <Field
            v-model="user.username"
            type="text"
            name="username"
            class="block w-full px-3 py-3 mt-1 bg-white border shadow-sm rounded-2xl lg:text-lg border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
           
            placeholder="Username"
          />
          <ErrorMessage name="username" class="mt-1 text-sm italic text-red-500" />
        </div>

        <!-- Password -->
        <div class="relative mb-4">
          <label class="block mb-2 font-medium text-gray-700 lg:text-lg">Password</label>
          <div class="relative">
            <Field
              v-model="user.password"
              :type="passwordVisible ? 'text' : 'password'"
              name="password"
              class="block w-full px-3 py-3 pr-10 mt-1 bg-white border shadow-sm rounded-2xl lg:text-lg border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              placeholder="Password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
            >
              <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clip-rule="evenodd" />
                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
              </svg>
            </button>
          </div>
          <ErrorMessage name="password" class="text-sm italic text-red-500" />
        </div>

     
          <div class="buttons">
          <button type="submit" class=" blob-btn" :disabled="isSubmitting">
            {{ isSubmitting ? "Submitting..." : "Login" }}
            <span class="blob-btn__inner">
              <span class="blob-btn__blobs">
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
              </span>
            </span>
          </button>


<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
      <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
    </filter>
  </defs>
</svg>

        </div>
      </Form>
      <p v-if="message" class="mt-5 text-error">{{ message }}</p>
    </div>
    
    <!-- Success Modal start -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-75">
      <div class="w-1/3 px-16 bg-gray-100 rounded-lg py-14">
        <div class="flex justify-center">
          <div class="p-6 bg-green-200 rounded-full">
            <div class="flex items-center justify-center w-16 h-16 p-4 bg-green-500 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>
        </div>
        <h3 class="my-4 text-3xl font-semibold text-center text-gray-700">Success</h3>
        <p class="text-center text-gray-700">You have successfully logged in.</p>
        <button @click="redirectToHome" class="flex items-center justify-center w-full px-6 py-3 mx-auto mt-20 text-lg text-center text-white bg-emerald-400 hover:bg-emerald-500 rounded-2xl">Continuous</button>
      </div>
    </div>
    <!-- Success Modal End -->
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import apiClient from "@/services/AxiosClient.js";
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const user = ref({
  username: '',
  password: ''
});

const isSubmitting = ref(false);
const message = ref('');
const showSuccessModal = ref(false);
const passwordVisible = ref(false);

const schema = yup.object().shape({
  username: yup.string().required('Username is required!'),
  password: yup.string().required('Password is required!'),
});

const login = async (values) => {
  isSubmitting.value = true;

  try {
    const response = await apiClient.post("login", values);
    // Log the entire response for debugging
    console.log('API response:', response);

    const userData = response.data?.User;
    const token = response.data?.User?.token;

    // Ensure userData and token are defined
    if (!userData || !token) {
      throw new Error('User data or token is undefined');
    }

    // Ensure the role property is set
    if (!userData.role || !Array.isArray(userData.role) || userData.role.length === 0) {
      userData.role = 'user'; // Set a default role if it's missing
    } else {
      // Extract the role name from the first role object
      userData.role = userData.role[0].name;
    }

    // Set the token and user in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    // set login expiration
    setLoginExpiration();

    // Set the user and role in Vuex store
    store.commit('setUser', userData);
    store.commit('setJwtToken', token);



    // Check if the role property exists in userData
    if (userData && userData.role) {
      store.commit('setRole', userData.role);
    } else {
      // Set a default role if the role property is missing or undefined
      store.commit('setRole', 'user');
    }

    // Show the success modal
    showSuccessModal.value = true;
  } catch (error) {
    // Log the error for debugging
    console.error('Login error:', error);

    // Check if error object exists and contains data property
    if (error.response && error.response.data && error.response.data.message) {
      // Display the error message from the server
      message.value = error.response.data.message;
    } else {
      // Display a generic error message
      message.value =
        "We're experiencing technical difficulties connecting to the backend server. Please try again in a few minutes or contact support if the issue continues."
;
    }

    // Handle specific error messages based on backend responses
    if (error.response && error.response.status === 401) {
        message.value = 'Could not verify user!';

    } else if (error.response && error.response.status === 403) {
      message.value = 'Wrong password.';
    }
  } finally {
    isSubmitting.value = false;
  }
};
// login expireation function
const setLoginExpiration = () => {
  const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
  localStorage.setItem('loginExpiration', expirationTime);
};


const redirectToHome = () => {
  showSuccessModal.value = false;
  router.push('/home');
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}

.min-h-screen {
  min-height: 100vh;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .login-content {
    justify-content: center;
  }
}

@media screen and (max-width: 768px) {
  .hide-on-mobile-tablet {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .hide-on-mobile-tablet {
    display: none;
  }
}

/* Success Modal Styles */

:root {
  --cyan: #059669;
  --dark: #FFFFFF;
  --borderW: 2px;
}

.buttons {
  margin-top: 50px;
  text-align: center;
}

.blob-btn {
  --numOfBlobs: 4;
  --cyan: #059669;
  --dark: #FFFFFF;
  --borderW: 2px;
  z-index: 1;
  position: relative;
  padding: 1rem 0.75rem 1rem 0.75rem;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  color: var(--cyan);
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  transition: color 0.5s;
  cursor: pointer;
  border-radius: 30px;
  width: 100%;
}

.blob-btn::before {
  content: "";
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: var(--borderW) solid var(--cyan);
  border-radius: 30px;
}

.blob-btn::after {
  content: "";
  z-index: -2;
  position: absolute;
  left: calc(var(--borderW) * 1.5);
  top: calc(var(--borderW) * 1.5);
  width: 100%;
  height: 100%;
  transition: all 0.3s 0.2s;
  border-radius: 30px;
}

.blob-btn:hover {
  color: var(--dark);
  border-radius: 30px;
}

.blob-btn:hover::after {
  transition: all 0.3s;
  left: 0;
  top: 0;
  border-radius: 30px;
}

.blob-btn__inner {
  z-index: -1;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: #ffffff;
}

.blob-btn__blobs {
  position: relative;
  display: block;
  height: 100%;
  filter: url('#goo');
}

.blob-btn__blob {
  position: absolute;
  top: var(--borderW);
  width: calc(100% / var(--numOfBlobs));
  height: 100%;
  background: var(--cyan);
  border-radius: 100%;
  transform: translate3d(0,150%,0) scale(1.7);
  transition: transform 0.45s;
}

@supports(filter: url('#goo')) {
  .blob-btn__blob {
    transform: translate3d(0,150%,0) scale(1.4);
  }
}

.blob-btn__blob:nth-child(1) { left: calc(0 * (120% / var(--numOfBlobs))); transition-delay: calc(0 * 0.08s); }
.blob-btn__blob:nth-child(2) { left: calc(1 * (120% / var(--numOfBlobs))); transition-delay: calc(1 * 0.08s); }
.blob-btn__blob:nth-child(3) { left: calc(2 * (120% / var(--numOfBlobs))); transition-delay: calc(2 * 0.08s); }
.blob-btn__blob:nth-child(4) { left: calc(3 * (120% / var(--numOfBlobs))); transition-delay: calc(3 * 0.08s); }

.blob-btn:hover .blob-btn__blob {
  transform: translateZ(0) scale(1.7);
}

@supports(filter: url('#goo')) {
  .blob-btn:hover .blob-btn__blob {
    transform: translateZ(0) scale(1.4);
  }
}
</style>
