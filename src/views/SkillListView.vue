<template>
	<div v-if="!hide">	
		<dt id="complementaria" v-if="otherTraining">Skills
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
		</dt>
		<dd id="complementary" v-if="otherTraining">
			<ul>
				<div v-for="(skill, firstindex) in otherTraining" v-bind:key="firstindex">
					<li>
						<strong>{{ skill.name }}</strong>
						<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-skill-${firstindex}`)">
							<b-icon icon="pencil-square" aria-hidden="true"/>
						</b-link>
						<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-skill-${firstindex}`)">
							<b-icon icon="x-circle-fill" aria-hidden="true"/>
						</b-link>
						<skill-view
							:skill="skill"
							:iconsHidden="iconsHidden"
							@refresh="$emit('refresh')"
						/>
					</li>
					<b-modal 
						:id="`edit-skill-${firstindex}`" 
						title="Editar skill"
						ok-title="Guardar"
					>
						<div style="text-align: center; margin: 0 auto; width:380px;">
							<input class="m-2" type="text" v-model="skill.name" />
						</div>
					</b-modal>
					<b-modal 
						:id="`delete-skill-${firstindex}`"
						title="Eliminar Contrato"
						ok-title="Eliminar"
						@ok="otherTraining.splice(firstindex, 1)"
					>
						<div style="text-align: center; margin: 0 auto; width:380px;">
							<h1>¿Seguro que quieres eliminar el contrato '{{ skill.name }}'?</h1>
						</div>
					</b-modal>
				</div>
			</ul>
			<div v-if="add">
				<input type="text" v-model="trainingNew" />
				<b-button class="m-2" @click="save(trainingNew)">Guardar</b-button>
				<b-button class="m-2" @click="cancel">Cancelar</b-button>
			</div>
			<b-link v-if="!iconsHidden" @click="add = true">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir Skill
			</b-link>
		</dd>
		<dd class="clear"></dd>
	</div>
</template>

<script lang="ts">
import SkillView from './SkillView.vue';
import { ContentType } from '../Config/types'

export default {
  name: 'ComplementaryExperienceListView',
  components: {
    SkillView
  },
  props:{
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
			ContentType: ContentType,
			hide: false,
			counter: 0,
			trainingNew: '',
			add: false,
			otherTraining:[]
		}
	},
	methods: {
		hidden() {
			this.counter--;
			if (this.counter == 0 && this.otherTraining.length >= 1) {
				this.hide = true;
			}
			this.$emit('sizeChange');
		},
		cancel() {
			this.trainingNew = '';
			this.add = false;
		},
		save(training: string) {
			this.$nextTick(() => {
				this.otherTraining.push({ name: training });
				this.cancel();
				this.$emit('refresh');
			});
		}
	}
}
</script>
