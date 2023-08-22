<template>
  <li v-if="contracts != undefined">
    Contratos (ordenados de manera cronológica):
    <ul>
      <div v-for="contract in contracts" v-bind:key="contract.guid">
        <li>
          {{ contract.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${contract.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${contract.guid}`)"/>
          <contract-view
            :guid="contract.guid"
            :iconsHidden="iconsHidden"
            :contract="contract"
            @update="refresh($event)"
            @reload="$emit('reload')"
          />
        </li>
        <b-modal
          :id="`edit-contract-${contract.guid}`"
          title="Editar contrato"
          ok-title="Guardar"
          @ok="update(contracts)"
        >
          <input type="text" v-model="contract.name" /> <br />
        </b-modal>
        <delete-modal
          :modal-title="'Contrato'"
          :message="'el contrato'"
          :component-data="contract"
          @remove="splice(contract)"
        />
      </div>
    </ul>
  </li>
</template>

<script lang="ts">
import ContractView from "./ContractView.vue";
import { Component } from "../../Config/types";
import DeleteModal from "../Modal/DeleteModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";

export default {
  name: "ContractsView",
  components: {
    ContractView,
    DeleteModal,
    DeleteLink,
    EditLink
},
  props: {
    contracts: {
      type: Array,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      projectData: "",
    };
  },
  methods: {
    splice(element: Component): void {
      this.contracts.splice(this.contracts.indexOf(element), 1);
      this.$emit("reload");
    },
    refresh(contract: Component): void {
      this.contracts.find((data: any) => {
        if(data.guid == contract.guid) data = contract;
      });
      this.$emit("update", this.contracts);
    },
    update(contracts: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", contracts);
      });
    },
  }
};
</script>
