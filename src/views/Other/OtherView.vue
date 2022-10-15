<template>
  <div>
    <ul>
      <div v-for="(value, secondindex) in values.values" v-bind:key="secondindex">
        <li v-if="!hide">
          {{ value.name }}
          <b-link v-if="!iconsHidden" @click="$bvModal.show(`edit-value-${secondindex}`)">
            <b-icon icon="pencil-square" aria-hidden="true"/>
          </b-link>
          <b-link v-if="!iconsHidden" @click="$bvModal.show(`delete-value-${secondindex}`)">
            <b-icon icon="x-circle-fill" aria-hidden="true"/>
          </b-link>
        </li>
        <b-modal 
          :id="`edit-value-${secondindex}`"
          title="Editar elemento"
          ok-title="Guardar"
          @cancel="cancel"
        >
          <label>Nombre:</label> <input type="text" v-model="value.name" /> <br />
        </b-modal>
        <b-modal 
          :id="`delete-value-${secondindex}`" 
          title="Eliminar valor"
          ok-title="Eliminar"
          @ok="splice(secondindex)"
        >
          <div style="text-align: center; margin: 0 auto; width:380px;">
            <h1>¿Seguro que quieres eliminar el valor '{{ value.name }}'?</h1>
          </div>
        </b-modal>
      </div>
      <div v-if="!iconsHidden">
        <b-link @click="$bvModal.show(`add-value-${otherIndex}`)">
          <b-icon icon="plus-circle-fill" aria-hidden="true"/> Añadir valor
        </b-link>
    </div>
    </ul>
    <b-modal 
      :id="`add-value-${otherIndex}`"
      title="Añadir valor"
      ok-title="Guardar"
      @ok="save(valueNew)"
      @cancel="cancel"
      @refresh="$emit('refresh')"
    >
      <label>Nombre</label> <input type="text" v-model="valueNew" /> <br />
    </b-modal>
  </div>
</template>


<script lang="ts">

export default {
  name: 'OtherView',
  props:{
    otherData: {
      type: Object,
      required: true
    },
    iconsHidden: {
      type: Boolean,
      required: true
    },
    otherIndex: {
      type: Number,
      required: true
    }
  },
  data() {
		return {
      hide: false,
      add: false,
      contract: false,
      valueNew: '',
      values: {
        id: 0,
        values: []
      }
    }
	},
  methods: {
    cancel() {
      this.valueNew = '';
      this.add = false;
    },
    save(value: string) {
			this.$nextTick(() => {
				this.values.values.push({ name: value });
        this.values.id = this.otherIndex;
				this.cancel();
				this.$emit('update', this.values);
			});
    },
    splice(index: number) {
      this.values.values.splice(index, 1);
      this.values.id = this.otherIndex;
      this.$emit('update', this.values);
    }
  }
}
</script>

