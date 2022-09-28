<template>
	<div v-if="!hide">
      <b-icon v-if="media.type === SocialMediaType.Linkedin" icon="linkedin" aria-hidden="true"/> <a v-if="media.type === SocialMediaType.Linkedin" :href="'https://www.linkedin.com/in/' + media.name + '/'">{{ 'https://www.linkedin.com/in/' + media.name  + '/'}}</a>
      <b-icon v-if="media.type === SocialMediaType.GitHub" icon="github" aria-hidden="true"/> <a v-if="media.type === SocialMediaType.GitHub" :href="'https://github.com/' + media.name + '/'">{{ 'https://github.com/' + media.name + '/'}}</a>
      <b-icon v-if="media.type === SocialMediaType.Infojobs" icon="link" aria-hidden="true"/> <a v-if="media.type === SocialMediaType.Infojobs" :href="'https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=' + media.name">{{ 'https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=' + media.name }}</a>
			<b-link v-if="!iconsHidden" @click="hide = true, $emit('contract')">
				<b-icon icon="eye-slash-fill"/>
			</b-link>
			<b-link v-if="!iconsHidden" @click="editMedia(media)">
				<b-icon icon="pencil-square" aria-hidden="true"/>
			</b-link>
		<b-modal 
			:id="`edit-social-media-${media.name}`"
			title="Editar red social"
			ok-title="Guardar"
			@ok="update(media)"
			@cancel="cancel"
		>
			<label>Url:</label> <input type="text" v-model="media.name" /> <br />
			<label>Tipo:</label> <b-form-select disabled :options="sociamMediaTypes" v-model="media.type" ></b-form-select> <br />
		</b-modal>
	</div>
</template>


<script lang="ts">
import { SocialMediaType } from './Config/types';

export default {
  name: 'SocialMediaView',
  props:{
    socialMediaData: {
      type: Object,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
      SocialMediaType: SocialMediaType,
      hide: false,
	  media: {},
      sociamMediaTypes:[
          { value: SocialMediaType.Linkedin, text: 'Linkedin' },
          { value: SocialMediaType.Infojobs, text: 'Infojobs' },
          { value: SocialMediaType.GitHub, text: 'GitHub' }
		]
		}
	},
	mounted(){
		this.media = {
			name: this.socialMediaData.name,
			type: this.socialMediaData.type
		};
	},
    methods: {
		update(socialMediaData: any) {
			this.$nextTick(() => {
				this.$emit('update', socialMediaData);
				this.$forceUpdate();
			});
			
		},
		editMedia(socialMediaData: any) {
			this.$nextTick(() => {
				this.$bvModal.show(`edit-social-media-${socialMediaData.name}`);
        });
		},
		cancel(){
			this.$bvModal.hide(`edit-social-media-${this.media.name}`);
		}
  },
}
</script>

