<template>
  <ul>
    <div v-for="content in contentsData" v-bind:key="content.id">
      <li>
        {{ content.name }}
        <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-content-${content.id}`)">
          <b-icon icon="pencil-square" aria-hidden="true"/>
        </b-link>
        <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-content-${content.id}`)">
          <b-icon icon="x-circle-fill" aria-hidden="true"/>
        </b-link>
        <content-view
          :content="content"
          :iconsHidden="iconsHidden"
          :contentIndex="content.id"
          @update="refresh($event, content)"
        />
      </li>
      <b-modal 
        :id="`delete-content-${content.id}`" 
        title="Eliminar Contenido"
        ok-title="Eliminar"
        @ok="splice(content.id)"
      >
        <div style="text-align: center; margin: 0 auto; width:380px;">
          <h1>¿Seguro que quieres eliminar el elemento '{{ content.name }}'?</h1>
        </div>
      </b-modal>
      <b-modal 
        :id="`edit-content-${content.id}`" 
        title="Editar Contenido"
        ok-title="Guardar"
      >
        <div style="text-align: center; margin: 0 auto; width:380px;">
          <input class="m-2" type="text" v-model="content.name" />
        </div>
      </b-modal>
    </div>
  </ul>
</template>


<script lang="ts">
import ContentView from './ContentView.vue'
import { SubContent, Content } from '../../Config/types'

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
      element: '',
      contentsData: new Array<Content>()
    }
	},
  methods: {
    refresh(subContents: Array<SubContent>, content: any){
      this.$nextTick(() => {
        var filtered = this.contentsData.filter((data: any) => data.id !== content.id)
        var cont : Content = this.contentsData.find((data: any) => data.id === content.id)
        cont.subContents = subContents;
        filtered.push(cont);
        this.contentsData = filtered;
        this.$emit('update', this.contentsData);
      });
    },
    splice(index: number) {
      this.contentsData = this.contentsData.filter((data: any) => data.id !== index);
      this.$emit('update', this.contentsData);
    }
  },
  mounted(){
    this.contentsData = this.contents;
  },
}
</script>

