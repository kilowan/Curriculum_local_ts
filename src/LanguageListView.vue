<template>
	<div v-if="!hide">
		<dt id="idiomas" class="idiomas" v-if="languageList.length > 0">Idiomas
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('hide')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
    </dt>
		<dd id="languages" v-if="languageList">
			<ul>
				<div v-for="(languages, firstindex) in languageList" v-bind:key="firstindex">
          <language-view 
            :language="languages"
            :token="token"
            :iconsHidden="iconsHidden"
            :userId="userId"
            @hide="hiden"
            @refresh="refresh"
          />
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
			@ok="save"
      @ok-prevent="language.name == ''"
			@cancel="cancel"
		>
      <label>Nombre</label> <input type="text" v-model="language.name" /> <br />
      <label>Nivel</label> <input type="text" v-model="language.level" /> <br />
		</b-modal>
	</div>
</template>


<script lang="ts">
import LanguageView from './LanguageView.vue';
import axios from 'axios';

export default {
  name: 'AcademicTrainingView',
  components:{
    LanguageView
  },
  props:{
    languageList: {
      type: Array,
      required: true
    },
    curriculumId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true,
      default: null
    },
    token: {
      type: String,
      required: true
    },
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
      langList: [],
      language: {
        name: '',
        level: ''
      }
    }
	},
  methods: {
    refresh() {
      this.getLanguages();
      this.$emit('refresh');
    },
    async getLanguages() {
      await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${this.token}` },
        url: `http://localhost:8080/api/Language/${this.curriculumId}`
      }).then((data: any) => {
        this.langList = data.data.map((lang: any) => {
          return { value: lang.id, text: lang.name };
        });
      });
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
		async save() {
			if (this.language.name !== '') {
				await axios({
				method: 'post',
				headers: { Authorization: `Bearer ${this.token}` },
				url: `http://localhost:8080/api/Language`,
				data: {
					name: this.language.name,
					userId: this.userId,
					level: this.language.level !== ''? this.language.level: null,
				}
				}).then((data: any) =>{
					this.cancel();
					this.$emit('refresh');
				});
			}
		}
  },
  async mounted() {
    this.counter = this.languageList.length;
    this.getLanguages();
  },
}
</script>

