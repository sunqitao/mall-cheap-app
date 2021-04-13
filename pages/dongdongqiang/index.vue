<template>
  <view class="container bg-gray">
    <title-nav bg-color="bg-gray solid-bottom" :isBack="false">
      <block slot="content">达人捡漏-每天就那么几件</block>
    </title-nav>
    <tab class="nav fixed" :items="items" @tabselect="tabSelect" :style="'top:'+CustomBar+'px'"></tab>
    <view style="height: 45px"></view>
    <view class="main-content">
      <!-- <refresh @onRefresh="onRefresh" :pullupLoadingType="loadingType"> -->
        <product-list :list="goodsList"></product-list>
      <!-- </refresh> -->
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex';
  import ProductList from "@/components/ProductList/BoxLayout"
  import Refresh from '@/components/Refresh'
  import Tab from '@/components/Tab'

  export default {
    components: {ProductList, Tab, Refresh},
    data() {
      return {
        CustomBar: this.CustomBar,
        goodsList: [],
        loadingType: 'loading', //加载更多状态
        page: 1,
        size: 20,
        nineCid: -1,
		dongdongList:[],
        items: [
		]
      };
    },
    onLoad() {
		// console.log(11)
		// uni.showLoading()
		// this.loadData()
    },
	onShow() {
		console.log(11)
		this.loadData()
	},
    onReachBottom() {
      // this.loadData();
    },
    onShareAppMessage(res) {
      return {
        title: '达人捡漏-每天就那么几件，花小钱过小资生活',
        path: '/pages/dongdongqiang/index',
        imageUrl: ''
      };
    },
    computed: {},
    methods: {
      //请求数据
      async loadData() {
		 this.items = this.$cache.get('dongdonglist_items', []);
		 if (this.items.length === 0) {
			let result = await this.$api.backend.getDongdongGoodsList()
			this.items = result.data
			this.$cache.put('dongdonglist_items', this.items, 60 * 60 * 6)
		 }
		 if(this.goodsList.length < 1){
			 this.goodsList = this.items[0].goodslist
		 }
        uni.hideLoading()
      },
      onRefresh() {
        this.loadData('refresh');
        this.loadingType = 'loading'
      },
      tabSelect(index, item) {
        this.goodsList = item.goodslist
      }
    }
  }
</script>

<style lang='scss' scoped>
  page, .container {
    background: $page-color-base;
    height: 100%;
  }
</style>
