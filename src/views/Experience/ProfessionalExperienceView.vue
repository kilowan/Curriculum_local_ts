<template>
  <div>
    <ul>
      <li>Centro/Lugar: {{ companyData.place }}</li>
      <li>
        Fecha inicio: {{ formatDate(companyData.initDate) }}
      </li>
      <li v-if="company.finishDate">
        Fecha Fin: {{ formatDate(companyData.finishDate) }}
      </li>
      <contract-list-view
        :ref="'contract'"
        :contracts="company.childrens"
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
import { Component } from "../../Config/types";
import ContractListView from "./ContractListView.vue";

export default {
  name: "ProfessionalExperienceView",
  components: {
    ContractListView,
  },
  props: {
    company: {
      type: Object,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
    guid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      add: false,
      contractData: "",
      companyData: {} as Component,
      contractList: new Array<Component>(),
    };
  },
  methods: {
    update(contracts: Array<Component>) {
      this.companyData.childrens = contracts;
      this.$emit("update", this.companyData);
    },
    save(contract: any) {
      this.$nextTick(() => {
        let data = new Component(crypto.randomUUID(), contract);
        this.contractList.push(data);
        this.companyData.childrens.push(data);
        this.contractData = "";
        this.add = false;
        this.$emit("update", this.companyData);
      });
    },
    cancel() {
      this.contractData = "";
      this.add = false;
    },
    formatDate(date: any) {
      return new Date(date).toLocaleDateString();
    }
  },
  mounted() {
    this.companyData = this.company;
    this.$refs.contractt._data.contractsData = this.company.childrens;
  },
};
</script>
