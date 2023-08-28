<template>
  <input type="file" @change="readFile($event?.target?.files, result)" />
</template>

<script lang="ts">
export default {
  name: "FileReaderData",
  data(): any {
    return {};
  },
  methods: {
    result(data: string): void {
      this.$emit("output", data);
    },
    readFile(files: FileList, callback: any): void {
      var file = files[0];
      var reader = new FileReader();

      reader.onload = function () {
        callback(reader.result);
      };

      reader.readAsText(file);
    },
  },
};
</script>
