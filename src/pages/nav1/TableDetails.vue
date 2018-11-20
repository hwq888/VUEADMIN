<template>
  <div class="content-box">
    <h2>OrderNum: {{ OrderNum }}</h2>
    <!--<h2>订单号params: {{ $route.params.no }}</h2>-->
    <h2>订单号query: {{ $route.query.no }}</h2>
  </div>
</template>
<script>
// import api from '@/api/api'
export default {
  data () {
    return {
    }
  },
  computed: {
    OrderNum () {
      return this.$route.query.no
    }
  },
  watch: {
  },
  created: function () {},
  mounted () {
    // this.no = this.$route.query.no
  },
  methods: {
  }
}
</script>
