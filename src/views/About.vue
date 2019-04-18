<template>
  <div class="about">
    <h1>As you see ,i'am ready ,i come from '***{{cityname}}***'</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityname: '',
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  methods: {
    
  },
  mounted() {
    this.cityname = this.$route.params.id;
    console.log(this.cityname);
  },

}
</script>

<style lang="scss">
h1{
  color: #cceeff;
}
</style>

