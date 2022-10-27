<template>
  <div v-if="!hide">
    <dt id="experiencia">
      Experiencia
      <b-link v-if="!iconsHidden" @click="(hide = true)">
        <b-icon icon="eye-slash-fill" />
      </b-link>
    </dt>
    <dd id="experience">
      <ul>
        <div v-for="company in experienceList" v-bind:key="company.id">
          <li>
            {{ company.name }}
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`edit-experience-${company.id}`)"
            >
              <b-icon icon="pencil-square" aria-hidden="true" />
            </b-link>
            <b-link
              v-if="!iconsHidden"
              @click="$bvModal.show(`delete-experience-${company.id}`)"
            >
              <b-icon icon="x-circle-fill" aria-hidden="true" />
            </b-link>
            <professional-experience-view
              :company="company"
              :iconsHidden="iconsHidden"
              @update="refresh($event)"
            />
          </li>
          <b-modal
            :id="`edit-experience-${company.id}`"
            title="Editar Experiencia"
            ok-title="Guardar"
            @ok="update(experienceList)"
          >
            <label>Nombre</label> <input type="text" v-model="company.name" />
            <br />
            <label>Centro/Lugar:</label>
            <input type="text" v-model="company.place" /> <br />
            <label>Fecha de inicio</label>
            <b-form-datepicker
              v-model="company.initDate"
              min="2015-01-01"
              max="2030-12-31"
            ></b-form-datepicker>
            <br />
            <label>Fecha de fin</label>
            <b-form-datepicker
              v-model="company.finishDate"
              min="2015-01-01"
              max="2030-12-31"
            ></b-form-datepicker>
            <br />
          </b-modal>
          <b-modal
            :id="`delete-experience-${company.id}`"
            title="Eliminar Contrato"
            ok-title="Eliminar"
            @ok="deleteExperience(company.id)"
          >
            <div style="text-align: center; margin: 0 auto; width: 380px">
              <h1>
                ¿Seguro que quieres eliminar la experiencia '{{
                  company.name
                }}'?
              </h1>
            </div>
          </b-modal>
        </div>
      </ul>
      <b-link v-if="!iconsHidden" @click="$bvModal.show('add-experience')">
        <b-icon icon="plus-circle-fill" aria-hidden="true" /> Añadir experiencia
      </b-link>
    </dd>
    <dd class="clear"></dd>
    <b-modal
      :id="'add-experience'"
      title="Añadir Experiencia"
      ok-title="Guardar"
      @ok="save(experience)"
      @cancel="cancel"
    >
      <label>Nombre</label> <input type="text" v-model="experience.name" />
      <br />
      <label>Centro/Lugar:</label>
      <input type="text" v-model="experience.place" /> <br />
      <label>Tipo</label>
      <b-form-select
        :options="options()"
        v-model="experience.type"
      ></b-form-select>
      <br />
      <label>Fecha de inicio</label>
      <input type="date" v-model="experience.initDate" min="2015-01-01" max="2030-12-31" />
      <br />
      <label>Fecha de fin</label>
      <input
        type="date"
        v-model="experience.finishDate"
        min="2015-01-01"
        max="2030-12-31"
      />
      <br />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Experience, Contract } from "../../Config/types";
import ProfessionalExperienceView from "./ProfessionalExperienceView.vue";

export default {
  name: "ProfessionalExperienceListView",
  components: {
    ProfessionalExperienceView,
  },
  props: {
    iconsHidden: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      experienceList: new Array<Experience>(),
      experience: {} as Experience,
      add: false,
      hide: false,
    };
  },
  methods: {
    cancel() {
      this.add = false;
    },
    options: function () {
      return [
        { value: 1, text: "personal" },
        { value: 2, text: "professional" },
      ];
    },
    save(experience: any) {
      this.$nextTick(() => {
        this.experienceList.push({
          id: this.index,
          initDate: experience.initDate,
          finishDate: experience.finishDate,
          place: experience.place,
          name: experience.name,
          type: experience.type,
          contracts: new Array<Contract>(),
        });
        this.index++;
        this.$emit("update", this.experienceList);
        this.experience = {} as Experience;
      });
    },
    refresh(experience: Experience) {
      var exp = this.experienceList.filter(
        (data: any) => data.id !== experience.id
      );
      exp.push(experience);
      this.experienceList = exp;
      this.$emit("update", this.experienceList);
    },
    update(experiences: any) {
      this.$nextTick(() => {
        this.$emit('update', experiences);
      });
    },
    deleteExperience(index: number) {
      this.$nextTick(() => {
        this.experienceList = this.experienceList.filter(
          (data: any) => data.id !== index
        );
        this.$emit("update", this.experienceList);
      });
    },
  },
};
</script>
