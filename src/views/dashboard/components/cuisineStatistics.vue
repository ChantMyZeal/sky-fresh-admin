<template>
  <div class="container">
    <h2 class="homeTitle">
      商品信息<span><router-link to="dish">详情</router-link></span>
    </h2>
    <div class="orderviewBox">
      <ul>
        <li>
          <span class="status"><i class="iconfont icon-open"></i>已启售</span>
          <span class="num">{{ dishesData.sold }}</span>
        </li>
        <li>
          <span class="status"><i class="iconfont icon-stop"></i>已停售</span>
          <span class="num">{{ dishesData.discontinued }}</span>
        </li>
        <li class="add">
          <router-link to="/dish/add">
            <i></i>
            <p>新增商品</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import orderList from './orderList.vue'
@Component({
  components: { orderList },
  name: 'cuisineview',
})
export default class extends Vue {
  @Prop() private dishesData!: any
}
</script>
