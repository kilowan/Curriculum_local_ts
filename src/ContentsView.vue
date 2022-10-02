<template>
	<li v-if="contents.length > 0">	
		<strong class="m-2">Contenido:</strong>
		<ul>
			<div v-for="(content, i) in contents" v-bind:key="i">
        <li>
          {{ content.name }}
          <b-link @click="$bvModal.show(`edit-content-${i}`)">
            <b-icon icon="pencil-square" aria-hidden="true"/>
          </b-link>
          <b-link @click="$bvModal.show(`delete-content-${i}`)">
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

