<template>
  <div>
    <ul>
      <li>Centro/Lugar: {{ companyData.place }}</li>
      <li>
        Fecha inicio: {{ new Date(companyData.initDate).toLocaleDateString() }}
      </li>
      <li v-if="company.finishDate">
        Fecha Fin: {{ new Date(companyData.finishDate).toLocaleDateString() }}
      </li>
      <contract-list-view
        :ref="'contractt'"
        :contracts="contractList"
        :iconsHidden="iconsHidden"
        @update="update($event)"
      />
      <div v-if="add">
        <input class="m-2" type="text" v-model="contractData" />
        <b-button class="m-2" @click="save(contractData)">Guardar</b-button>
        <b-button class="m-2" @click="cancel">Cancelar</b-button>
      </div>
      <b-link v-if="!iconsHidden" @click="add = true">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir contrato
      </b-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { Project, Contract, Experience } from "../../Config/types";
import ContractListView from "./ContractListView.vue";

export default {
  name: "ProfessionalExperienceView",
  components: {
    ContractListView,
  },
  props: {
    company: {
      type: Object,
      required: true,
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      add: false,
      contractData: "",
      companyData: {} as Experience,
      contractList: new Array<Contract>(),
    };
  },
  methods: {
    update(contracts: Array<Contract>) {
      this.companyData.contracts = contracts;
      this.$emit("update", this.companyData);
    },
    save(contract: any) {
      this.$nextTick(() => {
        var data: Contract = {
          id: this.index,
          name: contract,
          projects: new Array<Project>(),
        };
        this.contractList.push(data);
        this.companyData.contracts.push(data);
        this.contractData = "";
        this.add = false;
        this.index++;
        this.$emit("update", this.companyData);
      });
    },
    cancel() {
      this.contractData = "";
      this.add = false;
    },
  },
  mounted() {
    this.companyData = this.company;
    this.$refs.contractt._data.contractsData = this.company.contracts;
    this.index = this.company.contracts.length === 0 || this.company.contracts === undefined || this.company.contracts === null? 0 : this.company.contracts.length-1;
  },
};
</script>
