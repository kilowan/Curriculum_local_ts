<template>
      <div v-if="socialMediaData.type === SocialMediaType.Linkedin"><b-icon icon="linkedin" aria-hidden="true"/> <a :href="'https://www.linkedin.com/in/' + socialMediaData.name + '/'">{{ 'https://www.linkedin.com/in/' + socialMediaData.name  + '/'}}</a></div>
      <div v-else-if="socialMediaData.type === SocialMediaType.GitHub"><b-icon icon="github" aria-hidden="true"/> <a :href="'https://github.com/' + socialMediaData.name + '/'">{{ 'https://github.com/' + socialMediaData.name + '/'}}</a></div>
      <div v-else><b-icon icon="link" aria-hidden="true"/> <a :href="'https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=' + socialMediaData.name">{{ 'https://www.infojobs.net/candidate/my-infojobs.xhtml?dgv=' + socialMediaData.name }}</a></div>
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
      sociamMediaTypes:[
          { value: SocialMediaType.Linkedin, text: 'Linkedin'},
          { value: SocialMediaType.Infojobs, text: 'Infojobs'},
          { value: SocialMediaType.GitHub, text: 'GitHub'}
		]
		}
	}
}
</script>

