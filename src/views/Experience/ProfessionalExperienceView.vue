<template>
  <div>
    <ul>
      <li>Centro/Lugar: {{ companyData.place }}</li>
      <li>Fecha inicio: {{ formatDate(companyData.initDate) }}</li>
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
      <AddLink v-if="!iconsHidden" :text="'contrato'" @click="add = true"/>
    </ul>
  </div>
</template>

<script lang="ts">
import AddLink from "@/components/AddLink.vue";
import { Component } from "../../Config/types";
import ContractListView from "./ContractListView.vue";

export default {
  name: "ProfessionalExperienceView",
  components: {
    ContractListView,
    AddLink
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
    guid: {
      type: String,
      required: true,
    },
  },
  data(): any {
    return {
      add: false,
      contractData: "",
      companyData: {} as Component,
      contractList: new Array<Component>(),
    };
  },
  methods: {
    update(contracts: Array<Component>): void {
      this.companyData.childrens = contracts;
      this.$emit("update", this.companyData);
    },
    save(contract: Component): void {
      this.$nextTick(() => {
        let data = new Component(crypto.randomUUID(), contract);
        this.contractList.push(data);
        this.companyData.childrens.push(data);
        this.contractData = "";
        this.add = false;
        this.$emit("update", this.companyData);
      });
    },
    cancel(): void {
      this.contractData = "";
      this.add = false;
    },
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    },
  },
  mounted(): void {
    this.companyData = this.company;
    this.$refs.contractt._data.contractsData = this.company.childrens;
  },
};
</script>
