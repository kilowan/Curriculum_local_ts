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
            @reload="$emit('reload')"
          />
        </li>
        <edit-modal
          :modalTitle="'Contrato'"
          :componentData="contract"
        />
        <delete-modal
          :modalTitle="'Contrato'"
          :message="'el contrato'"
          :componentData="contract"
          @remove="splice(contract)"
        />
      </div>
    </ul>
  </li>
</template>

<script lang="ts">
import ContractView from "./ContractView.vue";
import DeleteModal from "../Modal/DeleteModal.vue";
import DeleteLink from "@/components/DeleteLink.vue";
import EditLink from "@/components/EditLink.vue";
import EditModal from "../Modal/EditModal.vue";
import { Component } from "@/Config/Base/Component/Component";

export default {
  name: "ContractsView",
  components: {
    ContractView,
    DeleteModal,
    DeleteLink,
    EditLink,
    EditModal
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
    }
  }
};
</script>
