<template>
  <div>
    <!-- 头部组件 -->
    <Header />
    <nuxt />
    <!-- 尾部组件 -->
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    Header,Footer
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li,ul,ol,dl{
  list-style: none;
}
a{
  color: inherit;
  text-decoration: none;
}
em,i{
  font-style: normal;
}
</style>
