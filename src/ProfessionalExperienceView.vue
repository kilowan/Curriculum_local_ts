<template>
	<div>
		<ul>
		<li>Centro/Lugar: {{ company.place }}</li>
		<li>Fecha inicio: {{new Date(company.initDate).toLocaleDateString()}}</li>
		<li v-if="company.finishDate">Fecha Fin: {{new Date(company.finishDate).toLocaleDateString()}}</li>
			<contract-list-view	
			:contracts="contractList" 
			:iconsHidden="iconsHidden"
			@refresh="$emit('refresh')" />
			<div v-if="add">
				<input class="m-2" type="text" v-model="contractData" />
				<b-button class="m-2" @click="save(contractData)">Guardar</b-button>
				<b-button class="m-2" @click="cancel">Cancelar</b-button>
			</div>
			<b-link v-if="!iconsHidden" @click="add = true">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir contrato
			</b-link>
		</ul>
	</div>	
</template>


<script lang="ts">

import ContractListView from './ContractListView.vue';

export default {
  name: 'ProfessionalExperienceView',
  components: {
	ContractListView
  },
  props:{
    company: {
      type: Object,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    }
  },
  data() {
		return {
			contract: false,
			add: false,
			hide: false,
			contractData: '',
			contractList:[]
		}
	},
	methods: {
		save(contract: any) {
			this.$nextTick(() => {
				var data = {
					name: contract
				};
				this.contractList.push(data);
				this.contractData = '';
				this.add = false;
			});
		},
		cancel() {
			this.contractData = '';
				this.add = false;
		}
	}
}
</script>

