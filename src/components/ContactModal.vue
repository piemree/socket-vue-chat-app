<template>
  <form @submit.prevent="createContact" class="d-flex flex-column align-items-center ">
    <b-form-group label="USER ID" label-for="id-input" class="w-75">
      <b-form-input id="id-input" v-model="id"></b-form-input>
    </b-form-group>
    <b-form-group label="USER NAME" label-for="name-input" class="w-75">
      <b-form-input id="name-input" v-model="name"></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="success" class="mt-3" >Create Contact</b-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      name: "",
    };
  },
  methods: {
    createContact(){
      this.$store.dispatch("newContact",{id: this.id, name: this.name})
    }
  },
};
</script>
