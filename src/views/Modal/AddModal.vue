<template>
  <b-modal
    :id="`add-${guid}`"
    :title="getTitle()"
    ok-title="Guardar"
    @ok="save"
    @cancel="cancel"
  >
    <label>Nombre</label> <input type="text" v-model="newComponent.name" />
    <br />
    <label v-if="componentDataType === 4">Nivel</label>
    <input
      v-if="componentDataType === 4"
      type="text"
      v-model="newComponent.level"
    />
    <br />
    <label
      v-if="
        componentDataType === 2 || componentDataType === 1
      "
      >Centro/Lugar:</label
    >
    <input
      v-if="
        componentDataType === 2 || componentDataType === 1
      "
      type="text"
      v-model="newComponent.place"
    />
    <br />
    <label v-if="componentDataType === 1">Fecha de inicio</label>
    <input
      v-if="componentDataType === 1"
      type="date"
      v-model="newComponent.initDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <br />
    <label v-if="componentDataType === 1">Fecha de fin</label>
    <input
      v-if="componentDataType === 1"
      type="date"
      v-model="newComponent.finishDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <label v-if="componentDataType === 2">Graduación</label>
    <input
      v-if="componentDataType === 2"
      type="date"
      v-model="newComponent.graduationDate"
      min="2015-01-01"
      max="2030-12-31"
    />
    <br />
  </b-modal>
</template>

<script lang="ts">
import { Component } from '@/Config/Base/Component/Component';
import { ComponentType } from '@/Config/Base/Enums';


export default {
  name: "AddModal",
  props: {
    guid: {
      type: String,
      required: true,
    },
    componentDataType: {
      type: Number,
      required: true,
    }
  },
  data(): any {
    return {
      newComponent: {} as Component,
    };
  },
  methods: {
    cancel(): void {
      this.newComponent = {} as Component;
    },
    save(): void {
      this.$nextTick(() => {
        let component = new Component(
          crypto.randomUUID(),
          this.getChildrensType(),
          this.newComponent.name
        );
        component.componentDataType = this.componentDataType;
        component.place = this.newComponent?.place;
        component.initDate = this.newComponent?.initDate;
        component.finishDate = this.newComponent?.finishDate;
        component.graduationDate = this.newComponent?.graduationDate;
        //component.childrensTitle = this.getChildrensTitle();
        component.childrens = new Array<Component>();
        this.cancel();
        this.$emit("save", component);
      });
    },
    getTitle(): string {
      switch (this.componentDataType) {
        case ComponentType.Experience:
          return 'Añadir Experiencia';

        case ComponentType.Contract:
          return 'Añadir Contrato';

        case ComponentType.Project:
          return 'Añadir Proyecto';

        case ComponentType.Academic:
          return 'Añadir Formación';

        case ComponentType.Content:
          return 'Añadir Contenido';

        case ComponentType.SubContent:
          return 'Añadir Subcontenido';

        case ComponentType.Other:
          return 'Añadir Otros Datos';

        case ComponentType.Value:
          return 'Añadir Valor';
        default:
          return 'Añadir';
      }
    },
    getChildrensType(): ComponentType {
      switch (this.componentDataType) {
        case ComponentType.Experience:
          return ComponentType.Contract;

        case ComponentType.Contract:
          return ComponentType.Project;

        case ComponentType.Project:
          return ComponentType.Description;

        case ComponentType.Academic:
        case ComponentType.Skills:
          return ComponentType.Content;

        case ComponentType.Content:
        case ComponentType.Other:
          return ComponentType.SubContent;

        default:
          return ComponentType.Value;
      }
    }
  },
};
</script>
