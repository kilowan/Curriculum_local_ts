<template>
	<li>
		Contratos (ordenados de manera cronológica): 
		<ul>
      <div v-for="(contract, secondindex) in contracts" v-bind:key="secondindex">
        <li>
          {{contract.name}}
          <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-contract-${secondindex}`)">
            <b-icon icon="pencil-square" aria-hidden="true"/>
          </b-link>
          <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-contract-${secondindex}`)">
            <b-icon icon="x-circle-fill" aria-hidden="true"/>
          </b-link>
          <contract-view
            :iconsHidden="iconsHidden"
            @refresh="$emit('refresh')"
          />
        </li>
        <b-modal 
          :id="`edit-contract-${secondindex}`"
          title="Editar contrato"
          ok-title="Guardar"
          @cancel="cancel"
        >
          <input type="text" v-model="contract.name" /> <br />
        </b-modal>
        <b-modal 
          :id="`delete-contract-${secondindex}`" 
          title="Eliminar Contrato"
          ok-title="Eliminar"
          @ok="contracts.splice(secondindex, 1), $emit('refresh')"
        >
          <div style="text-align: center; margin: 0 auto; width:380px;">
            <h1>¿Seguro que quieres eliminar el contrato '{{ contract.name }}'?</h1>
          </div>
        </b-modal>
			</div>
		</ul>
	</li>
</template>


<script lang="ts">
import ContractView from './ContractView.vue';

export default {
  name: 'ContractsView',
  components: {
	ContractView
  },
  props:{
    contracts: {
      type: Array,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
      contract: false,
      contracted: false,
      hide: false,
      counter: 0,
      projects:[]
    }
	},
  methods: {
    hidden() {
      this.counter--;
      if (this.counter == 0) {
        this.hide = true;
      }
      this.$emit('contract');
    },
    save(projectData: any) {
      this.$nextTick(() => {
        this.contracts.projects.push({ name: projectData });
        this.projectData = '';
        this.$emit('refresh');
      });
    },
    cancel(contract: any) {
      this.$nextTick(() => {
        this.projectData = '';
        contract.add = false;
      });
    },
  },
  mounted() {
    this.counter = this.contracts.length;
  }
}
</script>

