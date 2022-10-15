<template>
	<div v-if="!hide">
		<dt id="idiomas" class="idiomas">Idiomas
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
    </dt>
		<dd id="languages">
			<ul>
				<div v-for="(language, firstindex) in languageList" v-bind:key="firstindex">
          <li>
            <strong>{{ language.name }}:</strong> {{ language.level }}
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-language-${firstindex}`)">
              <b-icon icon="pencil-square" aria-hidden="true"/>
            </b-link>
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-language-${firstindex}`)">
              <b-icon icon="x-circle-fill" aria-hidden="true"/>
            </b-link>
          </li>
          <b-modal 
            :id="`edit-language-${firstindex}`"
            title="Editar Idioma"
            ok-title="Guardar"
            @cancel="cancel"
          >
              <label>Nombre:</label> <input type="text" v-model="language.name" /> <br />
              <label>Nivel:</label> <input type="text" v-model="language.level" /> <br />
          </b-modal>
          <b-modal 
            :id="`delete-language-${firstindex}`" 
            title="Quitar idioma"
            ok-title="Quitar"
            @ok="languageList.splice(firstindex, 1)"
          >
            <div style="text-align: center; margin: 0 auto; width:380px;">
              <h1>¿Seguro que quieres quitar el idioma '{{ language.name }}'?</h1>
            </div>
          </b-modal>
				</div>
			</ul>
			<b-link v-if="!iconsHidden" @click="$bvModal.show('add-language')">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir idioma
			</b-link>
		</dd>
    <dd class="clear"></dd>
		<b-modal
			:id="'add-language'"
			title="Añadir Idioma"
			ok-title="Guardar"
			@ok="save(language)"
			@cancel="cancel"
		>
      <label>Nombre</label> <input type="text" v-model="language.name" /> <br />
      <label>Nivel</label> <input type="text" v-model="language.level" /> <br />
		</b-modal>
	</div>
</template>


<script lang="ts">

export default {
  name: 'AcademicTrainingView',
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
      languageLevelList: [],
      languageList: [],
      language: {
        name: '',
        level: ''
      }
    }
	},
  methods: {
    refresh() {
      this.$emit('refresh');
    },
    hiden() {
      this.counter--;
      if (this.counter == 0 && this.languageList.length >= 1) {
        this.hide = true;
      }
      this.$emit('sizeChange');
    },
		cancel() {
			this.add = false;
      this.language.name = '';
      this.language.level = '';
		},
		save(language: any) {
      this.$nextTick(() => {
        this.languageList.push({ name: language.name, level: language.level })
        this.language = {};
        this.$emit('refresh');
			});
		}
  }
}
</script>

