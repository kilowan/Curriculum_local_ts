<template>
	<li v-if="contents.length > 0">	
		<strong class="m-2">Contenido:</strong>
		<ul>
			<div v-for="(content, i) in contents" v-bind:key="i">
        <li>
          {{ content.name }}
          <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-content-${i}`)">
            <b-icon icon="pencil-square" aria-hidden="true"/>
          </b-link>
          <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-content-${i}`)">
            <b-icon icon="x-circle-fill" aria-hidden="true"/>
          </b-link>
          <content-view
            :content="content"
            :iconsHidden="iconsHidden"
            @refresh="$emit('refresh')"
          />
        </li>
        <b-modal 
          :id="`delete-content-${i}`" 
          title="Eliminar Contenido"
          ok-title="Eliminar"
          @ok="contents.splice(i, 1)"
        >
          <div style="text-align: center; margin: 0 auto; width:380px;">
            <h1>¿Seguro que quieres eliminar el elemento '{{ content.name }}'?</h1>
          </div>
        </b-modal>
        <b-modal 
          :id="`edit-content-${i}`" 
          title="Editar Contenido"
          ok-title="Guardar"
        >
          <div style="text-align: center; margin: 0 auto; width:380px;">
            <input class="m-2" type="text" v-model="content.name" />
          </div>
        </b-modal>
			</div>
		</ul>
	</li>
</template>


<script lang="ts">
import ContentView from './ContentView.vue'

export default {
  name: 'ContentsView',
  components:{
    ContentView
  },
  props:{
    contents: {
      type: Array,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
  },
  data() {
		return {
      add: false,
      element: '',
      editMode: false,
      counter: 0,
      hide: false,
    }
	},
  methods: {
    hidden() {
      this.counter--;
      if (this.counter == 0) {
        this.hide = true;
      }
      this.$emit('sizeChange');
    },
  },
  mounted(){
    this.counter = this.contents.length;
  },
}
</script>

