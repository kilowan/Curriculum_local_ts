<template>
  <div>
    <ul>
      <div v-for="(value, secondindex) in values" v-bind:key="secondindex">
        <li v-if="!hide">
          {{ value.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-value-${secondindex}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-value-${secondindex}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
        </li>
        <b-modal
          :id="`edit-value-${secondindex}`"
          title="Editar elemento"
          ok-title="Guardar"
        >
          <label>Nombre:</label> <input type="text" v-model="value.name" />
          <br />
        </b-modal>
        <b-modal
          :id="`delete-value-${secondindex}`"
          title="Eliminar valor"
          ok-title="Eliminar"
          @ok="splice(secondindex)"
        >
          <div style="text-align: center; margin: 0 auto; width: 380px">
            <h1>¿Seguro que quieres eliminar el valor '{{ value.name }}'?</h1>
          </div>
        </b-modal>
      </div>
      <div v-if="!iconsHidden">
        <b-link @click="$bvModal.show(`add-value-${otherIndex}`)">
          <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir valor
        </b-link>
      </div>
    </ul>
    <b-modal
      :id="`add-value-${otherIndex}`"
      title="Añadir valor"
      ok-title="Guardar"
      @ok="save(valueNew)"
      @cancel="cancel"
    >
      <label>Nombre</label> <input type="text" v-model="valueNew" /> <br />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Value, OtherData } from "@/Config/types";

export default {
  name: "OtherView",
  props: {
    otherData: {
      type: Object,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
    otherIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      other: {} as OtherData,
      hide: false,
      add: false,
      valueNew: "",
      values: new Array<Value>(),
    };
  },
  methods: {
    cancel() {
      this.valueNew = "";
      this.add = false;
    },
    save(value: string) {
      this.$nextTick(() => {
        this.other.values.push({
          id: this.index,
          name: value,
        });
        this.values.push({
          id: this.index,
          name: value,
        });

        this.index++;
        this.cancel();
        this.$emit("update", this.other);
      });
    },
    splice(index: number) {
      this.other.values.splice(index, 1);
      this.values.splice(index, 1);
      this.$emit("update", this.other);
    },
  },
  mounted() {
    this.other = this.otherData;
  },
};
</script>
