<template>
	<div v-if="!hide">
		<dt id="otros" class="otros" v-if="other">Otros datos
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
    </dt>
		<dd id="other" v-if="other">
			<ul>
				<div v-for="(otherData, firstindex) in other" v-bind:key="firstindex">
					<li>
						{{otherData.name}}
						<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-other-${firstindex}`)">
							<b-icon icon="pencil-square" aria-hidden="true"/>
						</b-link>
						<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-other-${firstindex}`)">
							<b-icon icon="x-circle-fill" aria-hidden="true"/>
						</b-link>
						<other-view
							:otherData="otherData"
							:iconsHidden="iconsHidden"
							:otherIndex="firstindex"
							@update="update($event)"
						/>
					</li>
					<b-modal
						:id="`edit-other-${firstindex}`"
						title="Editar Otros"
						ok-title="Guardar"
						@cancel="cancel"
					>
						<label>Nombre:</label> <input type="text" v-model="otherData.name" /> <br />
					</b-modal>
					<b-modal 
						:id="`delete-other-${firstindex}`" 
						title="Eliminar elemento"
						ok-title="Eliminar"
						@ok="splice(firstindex)"
					>
						<div style="text-align: center; margin: 0 auto; width:380px;">
							<h1>¿Seguro que quieres eliminar el elemento '{{ otherData.name }}'?</h1>
						</div>
					</b-modal>
				</div>
			</ul>
			<div v-if="add">
				<input type="text" v-model="otherNew" />
				<b-button class="m-2" @click="save(otherNew)">Guardar</b-button>
				<b-button class="m-2" @click="cancel">Cancelar</b-button>
			</div>
			<b-link v-if="!iconsHidden && !add" @click="add = true, $emit('sizeChange')">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir Otros Datos
			</b-link>
		</dd>
    <dd class="clear"></dd>
	</div>
</template>


<script lang="ts">
import otherView from './OtherView.vue';
import { Value } from '@/Config/types';

export default {
  name: 'OtherListView',
  components: {
    otherView
  },
  props:{
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
		hide: false,
		add: false,
		counter: 0,
		otherNew: '',
		other: []
		}
	},
  	methods: {
		hidden(){
			this.counter--;
			if (this.counter == 0 && this.other.length >= 1) {
				this.hide = true;
			}
			this.$emit('sizeChange');
		},
		cancel() {
			this.otherNew = '';
			this.add = false;
			this.$emit('update', this.other);
		},
		save(otherNew: string) {
			this.$nextTick(() => {
				this.other.push({ name: otherNew, values: new Array<Value>() });
				this.cancel();
			});
		},
		update(values: any){
			this.other[values.id].values = values.values;
			this.$emit('update', this.other);
		},
		splice(index: number) {
			this.other.splice(index, 1);
			this.$emit('update', this.other);
		}
  }
}
</script>

