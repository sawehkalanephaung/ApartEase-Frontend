<template>
   <ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
    <div class="relative flex flex-col items-center p-4">
      <div class="flex gap-4 mb-0">
        <input type="file" ref="fileInput" @change="handleFileUpload" multiple accept="image/*" class="hidden" />
      </div>
   
      <div class="flex flex-col items-center justify-center w-full h-40 mb-4 border-2 border-gray-300 border-dashed rounded-md" @dragover.prevent @drop.prevent="handleDrop">
          <Popper hover placement="top">
          <button @click.prevent="triggerFileInput" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mb-6 hover:text-primary">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
          </button>
          <template #content>
              <div>Upload Image</div>
          </template>
          </Popper>
        <p class="mb-4 text-lg">Drag & Drop Images or <a href="#" @click.prevent="triggerFileInput" class="text-lg text-emerald-500 hover:text-emerald-700 focus:outline-none focus:underline">browse</a></p>
      </div>
      <div class="flex flex-col w-full gap-4 overflow-y-auto max-h-96 custom-scrollbar" style="max-height: 32rem;">
    <div v-for="(image, index) in images" :key="index" class="flex items-center gap-4 p-2 border rounded">
      <img :src="image.url" alt="Uploaded Image" class="object-cover w-24 h-24 cursor-pointer" @click="openImageModal(image.url)" />
          <div class="flex-1">
            <span>{{ image.name }}</span>
            <span class="block text-sm text-gray-500">{{ formatFileSize(image.size) }}</span>
          </div>
          <button @click="removeImage(index)" class="p-2 rounded focus:outline-none focus:shadow-outline hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
            </svg>
            </button>
        </div>
      </div>
  <hr class="w-full mb-8 border-t border-gray-300">
  <div class="relative bottom-0 flex items-center justify-between w-full">
    <span class="flex-1 text-gray-700 text-medium">Total Images: {{ images.length }}</span>
    <button @click="uploadImages" :disabled="isUploading" class="flex items-center justify-center px-4 py-2 text-white rounded-2xl bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed">
  <template v-if="isUploading">
    <svg class="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Uploading...
  </template>
  <template v-else>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
    Upload
  </template>
</button>
  </div>
    </div>

    <!-- Image Preview Modal -->
<div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="closeImageModal">
  <div class="relative w-11/12 max-w-2xl p-4 bg-white rounded-lg shadow-lg" @click.stop>
    <button @click="closeImageModal" class="absolute text-gray-700 top-2 right-2 hover:text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="flex items-center justify-center h-[70vh]">
      <img :src="currentImage" alt="Preview Image" class="object-contain max-w-full max-h-full" />
    </div>
  </div>
</div>

  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Popper from 'vue3-popper';
  import apiClient from '@/services/AxiosClient.js'; // Use the configured Axios client
  import ToastNotification from '@/components/ToastNotification.vue';
  
  const images = ref([]);
  const allowedExtensions = ['png', 'jpg', 'jpeg'];
  const isUploading = ref(false);



  const showToast = ref(false);
  const toastMessage = ref('');
  const toastType = ref('success');

  const showToastMessage = (message, type = 'success') => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  };

  const isAllowedFileType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  return allowedExtensions.includes(extension);
};


  
  const triggerFileInput = () => {
    document.querySelector('input[type="file"]').click();
  };
  
  const handleFileUpload = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    if (isAllowedFileType(files[i].name)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.value.push({ url: e.target.result, name: files[i].name, size: files[i].size, file: files[i] });
      };
      reader.readAsDataURL(files[i]);
    } else {
      console.log('Only PNG, JPG, JPEG files are allowed!');
      showToastMessage('Only PNG, JPG, JPEG files are allowed!', 'warning');
    }
  }
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    if (isAllowedFileType(files[i].name)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.value.push({ url: e.target.result, name: files[i].name, size: files[i].size, file: files[i] });
      };
      reader.readAsDataURL(files[i]);
    } else {
      console.log('Only PNG, JPG, JPEG files are allowed!');
      showToastMessage('Only PNG, JPG, JPEG files are allowed!', 'warning');
    }
  }
};

  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const removeImage = (index) => {
    images.value.splice(index, 1);
    showToastMessage('Image removed successfully', 'success');
  };
  
  const uploadImages = async () => {
    isUploading.value = true;
  console.log("Sending Images.");
  const formData = new FormData();
  images.value.forEach((image) => {
    formData.append('files[]', image.file);
  });

  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      validateStatus: (status) => {
        // Consider all HTTP status codes as valid responses
        return status >= 200 && status < 500; 
      },
    });

    if (response.status === 200) {
      console.log('Images uploaded successfully!');
      showToastMessage('Images uploaded sucessfully!');
      console.log('Uploaded file URLs:', response.data.uploaded_file_urls);

  
    } else if (response.status === 409 && response.data.message) {
      const { error, list } = response.data.message;
      alert(`${error}\nHere is the list of names:\n• ${list.join("\n• ")}`);
    } else {
      console.log('Failed to upload images.');
      showToastMessage('No images found. Please choose files to upload', "info");
    }
  } catch (error) {
    console.error('Error uploading images:', error);
    showToastMessage('Unable to upload image. Machine learning service is down or the image already used.', 'error');
  }finally {
    isUploading.value = false;
  }
};


// Image preview modal state
const showImageModal = ref(false);
const currentImage = ref('');

const openImageModal = (imageUrl) => {
  currentImage.value = imageUrl;
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  currentImage.value = '';
};
  </script>
  
  <style scoped>
  .hidden {
    display: none;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 12px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style>
  