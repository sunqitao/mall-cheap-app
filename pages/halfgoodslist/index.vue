<template>
  <view class="container">
    <title-nav bg-color="bg-white solid-bottom" :isBack="true">
      <block slot="content">每天准时半价，只这几个</block>
    </title-nav>
    <view class="main-content">
        <product-list :list="goodsList"></product-list>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex';
  import ProductList from "@/components/ProductList/BoxLayoutHalf"
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
        items: [{
          text: '精选',
          value: '-1'
        }, {
          text: '5.9元区',
          value: '1'
        }, {
          text: '9.9元区',
          value: '2'
        }, {
          text: '19.9元区',
          value: '3'
        }]
      };
    },
    onLoad() {
      this.loadData()
    },
    onReachBottom() {
      // this.loadData();
    },
    onShareAppMessage(res) {
      return {
        title: '淘抢购/聚划算半价盘点',
        path: '/pages/halfgoodslist/index',
        imageUrl: ''
      };
    },
    computed: {},
    methods: {
      //请求数据
      async loadData(type = 'add') {
        //没有更多直接返回
        if (type === 'add') {
          if (this.loadingType === 'nomore') {
            return;
          }
          this.loadingType = 'loading';
        } else {
          this.loadingType = 'more'
        }
        if (type === 'refresh') {
          this.page = 1;
        }

        let result = await this.$api.backend.getHalfGoodsList();
        if (type === 'refresh') {
          this.goodsList = [];
        }
        let items = result.data.list;
        this.goodsList = this.goodsList.concat(items);
        this.loadingType = items.length === 0 || items.length < this.size ? 'nomore' : 'more';
        uni.hideLoading()
      },
      onRefresh() {
        this.loadData('refresh');
        this.loadingType = 'loading'
      },
      tabSelect(index, item) {
        uni.showLoading()
        this.nineCid = item.value
        this.loadData('refresh');
        this.loadingType = 'loading'
        uni.pageScrollTo({
          duration: 300,
          scrollTop: 0
        })
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
