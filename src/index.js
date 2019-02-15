// 这就是入口文件

// 引入 vue
// import Vue from 'vue/dist/vue.esm.js';
import Vue from 'vue';// vue 就是 vue/dist/vue.esm.js 这一长串的别名
import './styles/style.css';

Vue.component('hello',{
  template: `<div>我的地呀</div>`
})
new Vue({
  el: '#app',
  data: {
    msg: 'hello vue'
  },
  //template: `<div>我的天{{ msg }}</div>`

  // 我将采用 render函数的方法去渲染页面元素
  //render: function(h){
    // h -> document.createElement
    // var pEl = document.createElement('p');
    // pEl.innerHTML = '我是一个p';
    //return h('p','我是一个p')
  //}
})

$(function(){
  $('#h1').html('哈哈哈');
})