<template>
  <div>
    <project-list-view
      v-if="contracted"
      :projects="projects"
      :iconsHidden="iconsHidden"
      @contract="$emit('contract')"
      @refresh="$emit('refresh')"
    />
</div>
</template>


<script lang="ts">
import ProjectListView from './ProjectListView.vue';
export default {
  name: 'ContractView',
  components: {
	ProjectListView
  },
  props:{
    contract: {
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
      contracted: false,
      add: false,
      hide: false,
      projectData: '',
      projects: []
    }
	},
  methods: {
    cancel() {
      this.projectData = '';
      this.add = false;
    },
  },
}
</script>

