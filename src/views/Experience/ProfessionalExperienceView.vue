<template>
  <div v-if="company != undefined">
    <ul>
      <li>Centro/Lugar: {{ company.place }}</li>
      <li>Fecha inicio: {{ formatDate(company.initDate) }}</li>
      <li v-if="company.finishDate">
        Fecha Fin: {{ formatDate(company.finishDate) }}
      </li>
      <contract-list-view
        :contracts="company.childrens"
        :iconsHidden="iconsHidden"
        @update="update($event)"
        @reload="$emit('reload')"
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
import { Component, ComponentType } from "../../Config/types";
import ContractListView from "./ContractListView.vue";

export default {
  name: "ProfessionalExperienceView",
  components: {
    ContractListView,
    AddLink
},
  props: {
    company: {
      type: Component,
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
      contractData: ""
    };
  },
  methods: {
    update(contracts: Array<Component>): void {
      this.company.childrens = contracts;
      this.$emit("update", this.company);
    },
    save(contract: string): void {
      this.$nextTick(() => {
        let data = new Component(crypto.randomUUID(), ComponentType.Project, contract);
        this.company.childrens.push(data);
        this.contractData = "";
        this.add = false;
        this.$emit("update", this.company);
      });
    },
    cancel(): void {
      this.contractData = "";
      this.add = false;
    },
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    },
  }
};
</script>
