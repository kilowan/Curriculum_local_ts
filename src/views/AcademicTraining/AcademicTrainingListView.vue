<template>
	<div v-if="!hide">	
		<dt id="academica">Formación
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
    </dt>
		<dd id="academic">
			<ul>
				<div v-for="academic in academicTrainingList" v-bind:key="academic.id">
          <li>
            {{ academic.name }}
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-training-${academic.id}`)">
              <b-icon icon="pencil-square" aria-hidden="true"/>
            </b-link>
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-training-${academic.id}`)">
              <b-icon icon="x-circle-fill" aria-hidden="true"/>
            </b-link>
            <academic-training-view 
              :academic="academic"
              :iconsHidden="iconsHidden"
              :academicIndex="academic.id"
              @update="refresh($event)"
              @sizeChange="$emit('sizeChange')"
            />
          </li>
          <b-modal 
            :id="`edit-training-${academic.id}`"
            title="Editar formación"
            ok-title="Guardar"
            @cancel="cancel"
          >
            <label>Nombre:</label> <input type="text" v-model="academic.name" /> <br />
            <label>Centro/Lugar:</label> <input type="text" v-model="academic.place" /> <br />
            <div v-if="academic.graduationDate">
              <label>Graduación:</label> <b-form-datepicker
              v-model="academic.graduationDate"
              min="2015-01-01" max="2030-12-31"></b-form-datepicker> <br />
            </div>
          </b-modal>
          <b-modal 
            :id="`delete-training-${academic.id}`" 
            title="Eliminar Contrato"
            ok-title="Eliminar"
            @ok="splice(academic.id)"
          >
            <div style="text-align: center; margin: 0 auto; width:380px;">
              <h1>¿Seguro que quieres eliminar el contrato '{{ academic.name }}'?</h1>
            </div>
          </b-modal>
				</div>
			</ul>
    <b-link v-if="!iconsHidden" @click="$bvModal.show('add-training')">
      <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir formación
    </b-link>
		</dd>
		<dd class="clear"></dd>
		<b-modal 
			:id="'add-training'"
			title="Añadir Formación"
			ok-title="Guardar"
			@ok="save"
			@cancel="cancel"
		>
			<label>Nombre</label> <input type="text" v-model="training.name" /> <br />
			<label>Centro/Lugar:</label> <input type="text" v-model="training.place" /> <br />
			<label>Graduación</label> <input type="date"
				v-model="training.graduationDate"
				min="2015-01-01" max="2030-12-31"> <br />
		</b-modal>
	</div>
</template>


<script lang="ts">
import { ContentType, Content, Training } from '../../Config/types'
import AcademicTrainingView from './AcademicTrainingView.vue';

export default {
  name: 'AcademicTrainingListView',
  components: {
    AcademicTrainingView
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
      training: {} as Training,
      add: false,
      academicTrainingList: new Array<Training>(),
      index: 0
		}
	},
  methods: {
    refresh(academic: Training){
      this.$nextTick(() => {
        var filtered = this.academicTrainingList.filter((data: any) => data.id !== academic.id)
        var training = this.academicTrainingList.find((data: any) => data.id === academic.id)
        training = academic;
        filtered.push(training);
        this.academicTrainingList = filtered;
        this.$emit('update', this.academicTrainingList)
      });
    },
    splice(index: number) {
      this.$nextTick(() => {
        this.academicTrainingList = this.academicTrainingList
        .filter((data: any) => data.id !== index);
        this.$emit('update', this.academicTrainingList);
      });
    },
    cancel() {
      this.training = {} as Training;
      this.add = false;
    },
    save() {
      this.$nextTick(() => {
        this.academicTrainingList.push({
            id: this.index,
            name: this.training.name,
            type: 1,
            place: this.training.place,
            graduationDate: this.training.graduationDate,
            contents: new Array<Content>()
        });
        this.index++;
        this.cancel();
        this.$emit('update', this.academicTrainingList);
      });
    }
  }
}
</script>

