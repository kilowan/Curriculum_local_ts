<template>
	<div v-if="!hide">	
		<dt id="complementaria" v-if="otherTraining">Skills
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
		</dt>
		<dd id="complementary" v-if="otherTraining">
			<ul>
				<div v-for="skill in otherTraining" v-bind:key="skill.id">
					<li>
						<strong>{{ skill.name }}</strong>
						<b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-skill-${skill.id}`)">
							<b-icon icon="pencil-square" aria-hidden="true"/>
						</b-link>
						<b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-skill-${skill.id}`)">
							<b-icon icon="x-circle-fill" aria-hidden="true"/>
						</b-link>
						<skill-view
							:skill="skill"
							:iconsHidden="iconsHidden"
							@update="refresh($event)"
              				@sizeChange="$emit('sizeChange')"
						/>
					</li>
					<b-modal 
						:id="`edit-skill-${skill.id}`" 
						title="Editar skill"
						ok-title="Guardar"
					>
						<div style="text-align: center; margin: 0 auto; width:380px;">
							<input class="m-2" type="text" v-model="skill.name" />
						</div>
					</b-modal>
					<b-modal 
						:id="`delete-skill-${skill.id}`"
						title="Eliminar Contrato"
						ok-title="Eliminar"
						@ok="splice(skill.id)"
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
			<b-link v-if="!iconsHidden && !add" @click="add = true">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir Skill
			</b-link>
		</dd>
		<dd class="clear"></dd>
	</div>
</template>

<script lang="ts">
import SkillView from './SkillView.vue';
import { ContentType, Training, Content } from '../../Config/types'

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
			otherTraining: new Array<Training>(),
			index: 0
		}
	},
	methods: {
		cancel() {
			this.trainingNew = '';
			this.add = false;
		},
		refresh(skill: Training){
			this.$nextTick(() => {
				var filtered = this.otherTraining.filter((data: any) => data.id !== skill.id)
				var training = this.otherTraining.find((data: any) => data.id === skill.id)
				training = skill;
				filtered.push(training);
				this.otherTraining = filtered;
				this.$emit('update', this.otherTraining)
			});
		},
		splice(index: number) {
			this.$nextTick(() => {
				this.otherTraining = this.otherTraining
				.filter((data: any) => data.id !== index);
				this.$emit('update', this.otherTraining);
			});
		},
		save(training: string) {
			this.$nextTick(() => {
				this.otherTraining.push({ 
					id: this.index, 
					name: training,
					contents: new Array<Content>(),
				});
				this.index++;
				this.cancel();
				this.$emit('update', this.otherTraining);
			});
		}
	}
}
</script>
