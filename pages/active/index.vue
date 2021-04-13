<template>
    <view class="bg-gray container">
        <title-nav bg-color="bg-gray solid-bottom" :isBack="true">
            <block slot="content">主题清单最懂你，购物袋已就位</block>
        </title-nav>
        <view class="main-content">
            <refresh @onRefresh="onRefresh" :pullupLoadingType="loadingType">
                <product-list :list="goodsList"></product-list>
            </refresh>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex';
    import ProductList from "@/components/ProductList/HorizontalLayout"
    import Refresh from '@/components/Refresh'
    import Tab from '@/components/Tab'

    export default {
        components: { ProductList, Tab, Refresh },
        data() {
            return {
                CustomBar: this.CustomBar,
                goodsList: [],
                loadingType: 'loading', //加载更多状态
                cid: 1,
                items: [],
				page: 1,
				activeId:-1,
            };
        },
        async onLoad(options) {
			console.log(options)
			this.activeId = options.activeId;
            this.loadData()
        },
        onReachBottom(){
        },
        computed: {},
        methods: {
            //请求数据
            async loadData(type='add'){
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
               
               let result = await this.$api.backend.getActiveGoodsList(this.page++,this.activeId);
               if (type === 'refresh') {
                 this.goodsList = [];
               }
               let items = result.data;
               this.goodsList = this.goodsList.concat(items);
               this.loadingType = items.length === 0  ? 'nomore' : 'more';
               uni.hideLoading()
            },
            onRefresh() {
                this.loadData('refresh');
                this.loadingType = 'loading'
            },
        }
    }
</script>

<style lang='scss' scoped>
page, .main-content {
    background: $page-color-base;
    height: 100%;
}
</style>
