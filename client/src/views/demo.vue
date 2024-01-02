<template>
 {{ count }}
</template>

<script>

export default {
  data() {
    return {
      count:0
    };
  },
  mounted() {
    this.count++
  },
  methods: {
    
  },
};
</script>