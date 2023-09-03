<template>
  <div
    class="dropzone-container"
  >
    <input 
      type="file" 
      :accept="accept"
      @change="readFile($event?.target?.files, type, result)" 
    />
    <!--<input
      type="file"
      id="fileInput"
      class="hidden-input"
      @change="readFile($event?.target?.files, type, result)"
      ref="file"
    />
    <label :key="key" for="fileInput" class="file-label">
      <div>{{ message }}</div>
    </label>-->
  </div>
</template>

<script lang="ts">
import { Image } from '@/Config/Base/Image';
export default {
  name: "FileReaderData",
  data(): any {
    return {
      image: {} as Image,
    };
  },
  props:{
    type:{
      type: String,
      required: true
    },
    accept:{
      type: String,
      required: true
    },
  },
  methods: {
    result(data: any): void {
      if(this.type === 'text') this.$emit("output", data);
      else {
        this.image.data = data;
        this.$emit("output", this.image);
      }
    },
    readFile(files: FileList, type: string, callback: any): void {
      var file = files[0];
      var reader = new FileReader();

      reader.onload = function () {
        callback(reader.result);
      };

      if(type === 'text')reader.readAsText(file);
      else { 
        this.image = new Image(file.type, file.name);
        reader.readAsDataURL(file); 
      }
    },
    onChange() {
      this.files.push(...this.$refs.file.files);
    },
    dragover(e: any) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e: any) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
  },
};
</script>
<style>
.dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
}.file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
}
.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}
</style>
