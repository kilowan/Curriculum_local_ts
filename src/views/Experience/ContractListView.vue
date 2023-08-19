<template>
  <li>
    Contratos (ordenados de manera cronológica):
    <ul>
      <div v-for="contract in contractsData" v-bind:key="contract.guid">
        <li>
          {{ contract.name }}
          <EditLink v-if="!iconsHidden" @click="$bvModal.show(`edit-${contract.guid}`)"/>
          <DeleteLink v-if="!iconsHidden" @click="$bvModal.show(`delete-${contract.guid}`)"/>
          <contract-view
            :guid="contract.guid"
            :iconsHidden="iconsHidden"
            :contract="contract"
            @update="refresh($event)"
          />
        </li>
        <b-modal
          :id="`edit-contract-${contract.guid}`"
          title="Editar contrato"
          ok-title="Guardar"
          @ok="update(contractsData)"
        >
          <input type="text" v-model="contract.name" /> <br />
        </b-modal>
        <delete-modal
          :modal-title="'Contrato'"
          :message="'el contrato'"
          :component-data="contract"
          @remove="splice(contract.guid)"
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
      contractsData: new Array<Component>(),
      projectData: "",
    };
  },
  methods: {
    splice(index: string): void {
      this.contractsData = this.contractsData.filter(
        (data: any) => data.guid !== index
      );
      this.$emit("update", this.contractsData);
    },
    refresh(contract: Component): void {
      let filtered = this.contractsData.filter(
        (data: any) => data.guid !== contract.guid
      );
      filtered.push(contract);
      this.contractsData = filtered;
      this.$emit("update", this.contractsData);
    },
    update(contracts: Array<Component>): void {
      this.$nextTick(() => {
        this.$emit("update", contracts);
      });
    },
  },
  mounted(): void {
    this.contractsData = this.contracts;
  },
};
</script>
