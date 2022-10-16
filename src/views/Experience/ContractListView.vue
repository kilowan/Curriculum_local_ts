<template>
  <li>
    Contratos (ordenados de manera cronológica):
    <ul>
      <div v-for="contract in contractsData" v-bind:key="contract.id">
        <li>
          {{ contract.name }}
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`edit-contract-${contract.id}`)"
          >
            <b-icon icon="pencil-square" aria-hidden="true" />
          </b-link>
          <b-link
            v-if="!iconsHidden"
            @click="$bvModal.show(`delete-contract-${contract.id}`)"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true" />
          </b-link>
          <contract-view
            :iconsHidden="iconsHidden"
            :contract="contract"
            @update="update($event)"
          />
        </li>
        <b-modal
          :id="`edit-contract-${contract.id}`"
          title="Editar contrato"
          ok-title="Guardar"
        >
          <input type="text" v-model="contract.name" /> <br />
        </b-modal>
        <b-modal
          :id="`delete-contract-${contract.id}`"
          title="Eliminar Contrato"
          ok-title="Eliminar"
          @ok="splice(contract.id)"
        >
          <div style="text-align: center; margin: 0 auto; width: 380px">
            <h1>
              ¿Seguro que quieres eliminar el contrato '{{ contract.name }}'?
            </h1>
          </div>
        </b-modal>
      </div>
    </ul>
  </li>
</template>

<script lang="ts">
import ContractView from "./ContractView.vue";
import { Contract } from "../../Config/types";

export default {
  name: "ContractsView",
  components: {
    ContractView,
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
      contractsData: new Array<Contract>(),
      projectData: "",
    };
  },
  update(contract: Contract) {
    var filtered = this.contractsData.filter(
      (data: any) => data.id !== contract.id
    );
    filtered.push(contract);
    this.contractsData = filtered;
    this.$emit("update", this.contractsData);
  },
  methods: {
    splice(index: number) {
      this.contractsData = this.contractsData.filter(
        (data: any) => data.id !== index
      );
      this.$emit("update", this.contractsData);
    },
  },
  mounted() {
    this.contractsData = this.contracts;
  },
};
</script>
