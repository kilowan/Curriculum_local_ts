<template>
  <ELink
    v-if="text != undefined"
    :hidden="hidden"
    :icon="'plus-circle-fill'"
    :text="`Añadir ${text}`"
    @click="$emit('click')"
  />
  <ELink
    v-else
    :hidden="hidden"
    :icon="'plus-circle-fill'"
    :text="'Añadir'"
    @click="$emit('click')"
  />
</template>

<script lang="ts">
import { ComponentType } from "@/Config/Base/Enums";
import ELink from "./ELink.vue";

export default {
  name: "AddNewLink",
  data(): any {
    return {
      text: "Experiencia",
    };
  },
  components: {
    ELink,
  },
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      required: false,
    }
  },
  created(): void {
    this.$nextTick(() => {
      switch (this.type) {
        case ComponentType.Academic:
          this.text = "Formación";
          break;

        case ComponentType.Experience:
          this.text = "Experiencia";
          break;

        case ComponentType.Languages:
          this.text = "Idioma";
          break;

        case ComponentType.Other:
          this.text = "Elemento";
          break;

        case ComponentType.Skills:
          this.text = "Skill";
          break;

        case ComponentType.Description:
          this.text = "Descripcion";
          break;

        case ComponentType.Content:
          this.text = "Contenido";
          break;

        case ComponentType.Contract:
          this.text = "Contrato";
          break;

        case ComponentType.SubContent:
          this.text = "SubContenido";
          break;

        case ComponentType.Project:
          this.text = "Proyecto";
          break;

        case ComponentType.SocialMedia:
          this.text = "Red Social";
          break;

        default:
          break;
      }
    });
  }
};
</script>
