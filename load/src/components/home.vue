<template>
  <div>
    home
   
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  name: 'home',
  computed:{
   
  },
  methods:{
     ...mapActions(["getHome"])
  },
  mounted(){
      this.getHome();
  }
}
</script>

<style>

</style>
