<template>
	<div>
    <ul>
      <div v-for="(sub, thirdindex) in subContents" v-bind:key="thirdindex">
        <sub-content
          :subContent="sub" 
          :iconsHidden="iconsHidden"
          @refresh="$emit('refresh')"
          @hide="$emit('hide')"
        />
      </div>
      <b-link @click="$bvModal.show(`add-subcontent`)">
        <b-icon icon="plus-circle-fill" aria-hidden="true"/>Añadir SubContenido
      </b-link>
    </ul>
    <b-modal 
      :id="`add-subcontent`" 
      title="Añadir SubContenido"
      ok-title="Guardar"
      @ok="addOne(subcontent)"
    >
      <div style="text-align: center; margin: 0 auto; width:380px;">
        <input class="m-2" type="text" placeholder="Nuevo subcontenido" v-model="subcontent" />
      </div>
    </b-modal>
  </div>
</template>


<script lang="ts">
import axios from 'axios';
import  SubContent  from './SubContentView.vue';

export default {
  name: 'ContentView',
  components:{
    SubContent
  },
  props:{
    content: {
      type: Object,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true,
    }
  },
  data() {
		return {
      edit: false,
      hide: false,
      contentData: {
        id: Number.prototype,
        name: String.prototype,
      },
      subcontent: '',
      subContents: new Array<string>(),
    }
	},
  methods:{
    add(subContent: string){
      this.subContents.push(subContent);
      this.subcontent = '';
    },
    addOne(subContent: string) {
      this.subContents.push(subContent);
      this.subcontent = '';
    },
    cancel(){
      this.contentData = this.content;
      this.edit = false;
    },
    async deleteContent(){
      if (this.contentData.id) {
        await axios({
          method: 'delete',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Content/${this.contentData.id}`,
        }).then((data: any) =>{
          this.$emit('refresh');
        });
      }
    },
    async save(){
      if (this.contentData.name !== '') {
        await axios({
          method: 'put',
          headers: { Authorization: `Bearer ${this.token}` },
          url: `http://localhost:8080/api/Content/${this.contentData.id}/${this.contentData.name}`,
        }).then((data: any) =>{
          this.edit = false;
          this.$emit('refresh');
        });
      }
    },
  },
  mounted(){
    this.contentData = {
      id: this.content.id,
      name: this.content.name
    };
  }
}
</script>

