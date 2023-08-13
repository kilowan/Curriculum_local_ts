<template>
  <input type="file" @change="readFile($event, result)" />
</template>

<script lang="ts">
export default {
  name: "FileReaderData",
  data(): any {
    return {};
  },
  methods: {
    result(data: any): void {
      this.$emit("output", data);
    },
    readFile(fileInput: any, callback: any): void {
      var file = fileInput.target.files[0];
      var reader = new FileReader();

      reader.onload = function () {
        callback(reader.result);
      };

      reader.readAsText(file);
    },
  },
};
</script>
