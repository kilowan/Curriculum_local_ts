<template>
	<div v-if="!hide">	
		<dt id="academica">Formación
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('sizeChange')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
    </dt>
		<dd id="academic">
			<ul>
				<div v-for="(academic, firstindex) in academicTrainingList" v-bind:key="firstindex">
          <li>
            {{academic.name}}
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-training-${firstindex}`)">
              <b-icon icon="pencil-square" aria-hidden="true"/>
            </b-link>
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-training-${firstindex}`)">
              <b-icon icon="x-circle-fill" aria-hidden="true"/>
            </b-link>
            <academic-training-view 
              :academic="academic"
              :iconsHidden="iconsHidden"
              @hide="hidden"
              @sizeChange="$emit('sizeChange')"
              @refresh="$emit('refresh')"
            />
          </li>
          <b-modal 
            :id="`edit-training-${firstindex}`"
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
            :id="`delete-training-${firstindex}`" 
            title="Eliminar Contrato"
            ok-title="Eliminar"
            @ok="academicTrainingList.splice(firstindex, 1)"
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
			@ok="save(training)"
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
import { ContentType } from './Config/types'
import AcademicTrainingView from './AcademicTrainingView.vue';
import axios from 'axios';

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
      counter: 0,
      training:{
        name: '',
        place: '',
        graduationDate: null,
      },
      add: false,
      academicTrainingList: []
		}
	},
  methods: {
    hidden() {
      this.counter--;
      if (this.counter == 0 && this.academicTrainingList.length >= 1) {
        this.hide = true;
      }
      this.$emit('sizeChange');
    },
    cancel() {
      this.training = {
        name: '',
        place: '',
        graduationDate: null,
      };
      this.add = false;
    },
    save() {
      this.$nextTick(() => {
        this.academicTrainingList.push({
            name: this.training.name,
            place: this.training.place,
            graduationDate: this.training.graduationDate === '' ? null : this.training.graduationDate,
        });
        this.cancel();
        this.$emit('refresh');
      });
    }
  }
}
</script>

