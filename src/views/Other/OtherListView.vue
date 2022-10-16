<template>
  <div v-if="!hide">
    <dt id="otros" class="otros" v-if="other">
      Otros datos
      <b-link v-if="!iconsHidden" @click="(hide = true), $emit('sizeChange')">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="other" v-if="other">
      <ul>
        <div v-for="otherData in other" v-bind:key="otherData.id">
          <li>
            {{ otherData.name }}
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-other-${otherData.id}`)"
            >
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-other-${otherData.id}`)"
            >
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
            <other-view
              :otherData="otherData"
              :iconsHidden="iconsHidden"
              :otherIndex="otherData.id"
              @update="update($event)"
            />
          </li>
          <b-modal
            :id="`edit-other-${otherData.id}`"
            title="Editar Otros"
            ok-title="Guardar"
            @cancel="cancel"
          >
            <label>Nombre:</label>
            <input type="text" v-model="otherData.name" /> <br />
          </b-modal>
          <b-modal
            :id="`delete-other-${otherData.id}`"
            title="Eliminar elemento"
            ok-title="Eliminar"
            @ok="splice(otherData.id)"
          >
            <div style="text-align: center; margin: 0 auto; width: 380px">
              <h1>
                ¿Seguro que quieres eliminar el elemento '{{ otherData.name }}'?
              </h1>
            </div>
          </b-modal>
        </div>
      </ul>
      <div v-if="add">
        <input type="text" v-model="otherNew" />
        <b-button class="m-2" @click="save(otherNew)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <b-link
        v-if="!iconsHidden && !add"
        @click="(add = true), $emit('sizeChange')"
      >
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir Otros Datos
      </b-link>
    </dd>
    <dd class="clear"></dd>
  </div>
</template>

<script lang="ts">
import otherView from "./OtherView.vue";
import { Value, OtherData } from "@/Config/types";

export default {
  name: "OtherListView",
  components: {
    otherView,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      hide: false,
      add: false,
      counter: 0,
      otherNew: "",
      other: new Array<OtherData>(),
    };
  },
  methods: {
    cancel() {
      this.otherNew = "";
      this.add = false;
    },
    save(otherNew: string) {
      this.$nextTick(() => {
        this.other.push({
          id: this.index,
          name: otherNew,
          values: new Array<Value>(),
        });
        this.index++;
        this.$emit("update", this.other);
        this.cancel();
      });
    },
    update(other: OtherData) {
      var dat = this.other.find((data: any) => data.id === other.id);
      dat = other;
      this.other = this.other.filter((data: any) => data.id !== other.id);
      this.other.push(dat);
      this.$emit("update", this.other);
    },
    splice(index: number) {
      this.other = this.other.filter((data: any) => data.id !== index);
      this.$emit("update", this.other);
    },
  },
};
</script>
