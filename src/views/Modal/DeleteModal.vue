<template>
  <b-modal
    :id="`delete-${componentData.guid}`"
    :title="`Eliminar ${modalTitle}`"
    ok-title="Eliminar"
    @ok="$emit('remove', componentData)"
  >
    <div style="text-align: center; margin: 0 auto; width: 380px">
      <h1>
        ¿Seguro que quieres eliminar {{ message }} {{ componentData.name }}?
      </h1>
    </div>
  </b-modal>
</template>

<script lang="ts">
export default {
  name: "DeleteModal",
  props: {
    componentData: {
      type: Object,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {};
  },
};
</script>
