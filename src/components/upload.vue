<!-- FileUpload.vue -->
<template>
  <div>
    <div v-bind="getRootProps()" class="dropzone">
      <input v-bind="getInputProps()" />
      <div v-if="acceptedFiles.length > 0">
        <div class="file-preview" v-for="(file, index) in acceptedFiles" :key="index">
          <span>{{ file.name }}</span>
          <button @click="removeFile(index)" class="remove-button">x</button>
        </div>
      </div>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <!-- <button @click="open" class="open-button">Open File Dialog</button> -->
    <button @click="uploadFiles" class="upload-button" :disabled="acceptedFiles.length === 0">Upload Files</button>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <!-- <div v-if="isUploading"> -->
      <div v-for="(file, index) in acceptedFiles" :key="index" class="upload-status">
        <span>{{ file.name }}</span>
        <span v-if="uploadStatus[index] === 'uploading'" class="spinner"></span>
        <span v-if="uploadStatus[index] === 'success'" class="success">✔️</span>
        <span v-if="uploadStatus[index] === 'failed'" class="failed">❌</span>
      </div>
    <!-- </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import apiClient from '@/axios';

const url = '/upload-excel/';
const acceptedFiles = ref([]);
const errorMessage = ref('');
const isUploading = ref(false);
const uploadStatus = ref([]);

const validateFile = (file) => {
  const validExtensions = ['xlsx', 'xls'];
  const fileExtension = file.name.split('.').pop();
  return validExtensions.includes(fileExtension);
};

const saveFiles = async () => {
  isUploading.value = true;
  uploadStatus.value = acceptedFiles.value.map(() => 'uploading');

  for (let i = 0; i < acceptedFiles.value.length; i++) {
    const formData = new FormData();
    formData.append('file', acceptedFiles.value[i]);

    try {
      const response = await apiClient.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status === 'success') {
        uploadStatus.value[i] = 'success';
      } else {
        uploadStatus.value[i] = 'failed';
        errorMessage.value = response.data.error || 'Invalid file structure';
      }
    } catch (error) {
      uploadStatus.value[i] = 'failed';
      errorMessage.value = 'An error occurred while uploading the file.';
    }
  }

  isUploading.value = false;
};

const onDrop = (acceptedFilesList, rejectedFiles) => {
  acceptedFiles.value = [];
  errorMessage.value = '';

  for (let file of acceptedFilesList) {
    if (validateFile(file)) {
      acceptedFiles.value.push(file);
    } else {
      errorMessage.value = 'Only Excel files are allowed.';
    }
  }

  if (acceptedFiles.value.length === 0) {
    errorMessage.value = 'Please select at least one valid Excel file.';
  }

  console.log(rejectedFiles);
};

const removeFile = (index) => {
  acceptedFiles.value.splice(index, 1);
};

const uploadFiles = () => {
  if (acceptedFiles.value.length > 0) {
    saveFiles();
  } else {
    errorMessage.value = 'Please select at least one file to upload.';
  }
};

const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop });

</script>

<style>
.dropzone {
  border: 2px dashed #4a5568;
  border-radius: 8px;
  padding: 20px;
  background-color: #edf2f7;
  text-align: center;
  margin-bottom: 10px;
  min-height: 200px;
  width: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #4a5568;
  border-radius: 4px;
  margin-bottom: 5px;
}

.remove-button {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c53030;
}

.open-button,
.upload-button {
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.upload-button {
  margin-left: 10px;
}

.open-button:hover,
.upload-button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.upload-status {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 2s linear infinite;
  margin-left: 5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success {
  color: green;
  margin-left: 5px;
}

.failed {
  color: red;
  margin-left: 5px;
}
</style>
