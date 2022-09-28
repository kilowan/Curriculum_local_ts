<template>
	<div>	
			<div v-for="(socialMediaData, index) in socialMediaList" v-bind:key="index">
        <social-media-view 
          :socialMediaData="socialMediaData"
          :iconsHidden="iconsHidden"
          @update="edit($event)"
        />
			</div>
			<b-link :disabled="disabled" @click="$bvModal.show('add-social-media')">
				<b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir Red social
			</b-link>
      <b-modal
			:id="'add-social-media'"
			title="Añadir Red Social"
			ok-title="Guardar"
			@ok="add"
      @ok-prevent="socialmedia.name == ''"
			@cancel="$bvModal.hide('add-social-media')"
		>
      <label>Tipo</label> <b-form-select :options="types" v-model="socialmedia.type" /> <br />
      <div v-if="socialmedia.type === 1"><label>Id linkedin</label> <input type="text" v-model="socialmedia.name" /></div>
      <div v-else-if="socialmedia.type === 2"><label>Id infojobs</label> <input type="text" v-model="socialmedia.name" /></div>
      <div v-else ><label>Id github</label> <input type="text" v-model="socialmedia.name" /> </div><br />
		</b-modal>
	</div>
</template>

<script lang="ts">
import SocialMediaView from './SocialMediaView.vue';
import { SocialMediaType } from './Config/types';

export default {
  name: 'SocialMediaListView',
  components: {
    SocialMediaView
  },
  props:{
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
      types:[
          { value: SocialMediaType.Linkedin, text: 'Linkedin', disabled: false },
          { value: SocialMediaType.Infojobs, text: 'Infojobs', disabled: false },
          { value: SocialMediaType.GitHub, text: 'GitHub', disabled: false  }
      ],
      socialmedia: {
        name:'',
        type:''
      },
      disabled: false,
      socialMediaList:[]
    }
	},
  watch: {
    disable(){
      var data = this.types.find((element: any) => element.disabled !== true);
      if(data.length === 0) {
        this.$nextTick(() => {
          this.disabled = true;
			});
      }
    }
  },
  methods: {
		add() {
      var socialmedia = {
        name: this.socialmedia.name,
        type: this.socialmedia.type
      };
      this.socialmedia = {};
      this.socialMediaList.push(socialmedia);
      var type = this.types.find((element: any) => element.value === socialmedia.type);
      type.disabled = true;
		},
    edit(data: any){
      var sm = this.socialMediaList.find((element: any) => element.type === data.type);
      sm.name = data.name;
    }
  },
}
</script>

<style>
* { margin: 0; padding: 0; }
body { font: 16px Helvetica, Sans-Serif; line-height: 24px; background: url(./images/noise.jpg); }
.clear { clear: both; }
.idiomas { border-right: 1px solid #999; }
.otros { border-right: 1px solid #999; }
#page-wrap { width: 1000px; margin: 40px auto 60px; }
#pic { float: right; margin: -30px 0 0 0; height: 100px; }
h1 { margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 34px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999; }
h2 { font-size: 20px; margin: 0 0 6px 0; position: relative; }
h2 span { position: absolute; bottom: 0; right: 0; font-style: italic; font-family: Georgia, Serif; font-size: 16px; color: #999; font-weight: normal; }
p { margin: 0 0 16px 0; }
a { color: #999; text-decoration: none; border-bottom: 1px dotted #999; }
a:hover { border-bottom-style: solid; color: black; }
ul { margin: 0 0 32px 17px; }
li { font-size: 20px; }
#objective { width: 100%; float: left; }
#objective p { font-family: Georgia, Serif; font-style: italic; color: #666; }
dt { font-style: italic; font-weight: bold; font-size: 18px; text-align: right; padding: 0 26px 0 0; width: 150px; float: left; border-right: 1px solid #999;  }
dd { width: 800px; float: right; }
dd.clear { float: none; margin: 0; height: 15px; }
.formacion { border-right: 1px solid #999; }
.formacion2 { border-right: 1px solid #999; }
  .marco {
    margin:2%;
	border-style: groove; border-width: 1px;
  }
</style>

