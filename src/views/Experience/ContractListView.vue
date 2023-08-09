<template>
  <li>
    Contratos (ordenados de manera cronológica):
    <ul>
      <div v-for="contract in contractsData" v-bind:key="contract.guid">
        <li>
          {{ contract.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-contract-${contract.guid}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-contract-${contract.guid}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
          <contract-view
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
            :modal-id="'contract'"
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

export default {
  name: "ContractsView",
  components: {
    ContractView,
    DeleteModal
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
  data() {
    return {
      contractsData: new Array<Component>(),
      projectData: "",
    };
  },
  methods: {
      splice(index: string) {
        this.contractsData = this.contractsData.filter(
          (data: any) => data.guid !== index
        );
        this.$emit("update", this.contractsData);
      },
      refresh(contract: any) {
        var filtered = this.contractsData.filter(
          (data: any) => data.guid !== contract.guid
        );
        filtered.push(contract);
        this.contractsData = filtered;
        this.$emit("update", this.contractsData);
    },
    update(contracts: any) {
      this.$nextTick(() => {
        this.$emit('update', contracts);
      });
    },
  },
  mounted() {
    this.contractsData = this.contracts;
  },
};
</script>
