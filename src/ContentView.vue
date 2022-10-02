<template>
	<div>
    <ul>
      <div v-for="(sub, thirdindex) in subContents" v-bind:key="thirdindex">
        <li>
          {{ sub }}
          <b-link @click="$bvModal.show(`edit-subcontent-${thirdindex}`)">
            <b-icon icon="pencil-square" aria-hidden="true"/>
          </b-link>
          <b-link @click="$bvModal.show(`delete-subcontent-${thirdindex}`)">
            <b-icon icon="x-circle-fill" aria-hidden="true"/>
          </b-link>
        </li>
        <b-modal 
          :id="`delete-subcontent-${thirdindex}`" 
          title="Eliminar Contenido"
          ok-title="Eliminar"
          @ok="subContents.splice(thirdindex, 1)"
        >
          <div style="text-align: center; margin: 0 auto; width:380px;">
            <h1>¿Seguro que quieres eliminar el elemento '{{ sub.name }}'?</h1>
          </div>
        </b-modal>
        <b-modal 
          :id="`edit-subcontent-${thirdindex}`" 
          title="Editar Contenido"
          ok-title="Guardar"
          @cancel="cancel"
        >
          <div style="text-align: center; margin: 0 auto; width:380px;">
            <input class="m-2" type="text" v-model="sub.name" />
          </div>
        </b-modal>
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

export default {
  name: 'ContentView',
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
    addOne(subContent: string) {
      this.subContents.push(subContent);
      this.subcontent = '';
    },
    cancel(){
      this.contentData = this.content;
      this.edit = false;
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

