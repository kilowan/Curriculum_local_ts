<template>
  <div>
      <ul>
        <div v-for="(description, fourthindex) in descriptions" v-bind:key="fourthindex">
            {{ description }}
            <b-link v-if="!iconsHidden" @click="$emit('hide'), hide = true">
              <b-icon icon="eye-slash-fill"/>
            </b-link>
            <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-description-${fourthindex}`)">
              <b-icon icon="pencil-square" aria-hidden="true"/>
            </b-link>
            <b-link @click="$bvModal.show(`delete-description-${fourthindex}`)">
              <b-icon icon="x-circle-fill" aria-hidden="true"/>
            </b-link>
          <b-modal 
			      :id="`edit-description-${fourthindex}`"
			      title="Editar descripción"
			      ok-title="Guardar"
			      @ok="update"
			      @cancel="cancel"
		      >
			      <input type="text" v-model="description.name" /> <br />
		      </b-modal>
          <b-modal 
            :id="`delete-description-${fourthindex}`" 
            title="Eliminar Proyecto"
            ok-title="Eliminar"
            @ok="descriptions.splice(fourthindex, 1)"
          >
            <div style="text-align: center; margin: 0 auto; width:380px;">
              <h1>¿Seguro que quieres eliminar la descripción '{{ description.name }}'?</h1>
            </div>
          </b-modal>
        </div>
      </ul>
      <div v-if="add">
        <input  type="text" v-model="desc" />
        <b-button @click="save(desc)">Guardar</b-button>
        <b-button @click="cancel">Cancelar</b-button>
      </div>
      <b-link v-if="!add" @click="add = true">
        <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir descripción
      </b-link>
  </div>
</template>


<script lang="ts">

export default {
  name: 'ProjectView',
  props:{
    project: {
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
			contract: false,
      add: false,
      counter: 0,
      hideDesc: false,
      hideProj: false,
      description: '',
      desc: '',
      descriptions: []
		}
	},
  methods: {
    hidden() {
      this.counter--;
      if (this.counter == 0) {
        this.hideDesc = true;
      }
      this.$emit('sizeChange');
    },
    cancel() {
      this.add = false;
    },
    save(description: string) {
      this.$nextTick(() => {
        this.descriptions.push(description);
        this.add = false;
        this.desc = '';
        this.$emit('refresh');
      });
    },
  },
  mounted() {
    this.counter = this.project.descriptionList.length;
  }
}
</script>

