<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`" v-for='item in goods'
      :key="item.goods_id" :price="item.goods_price | toFixed" :title="item.goods_name"
      :thumb="item.goods_small_logo|| defaultPic" />
  </view>
</template>

<script>
  import {
    getGoodstList
  } from "../../api/list.js"
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {

        queryData: {
          query: '', //关键字
          cid: '', //分类id
          pagenum: 1, //页吗
          pagesize: 10 //每页条数
        },
        goods: [],
        total: 0,
        isLoading: false,
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',

      };
    },

    methods: {
      async loadGoodsList(stopPullDown) {
        this.isLoading = true
        const {
          goods,
          total
        } = await getGoodstList(this.queryData)
        // console.log(goods)
        this.isLoading = false
        this.goods = goods
        this.total = total

        stopPullDown && stopPullDown()

      }
    },
    onLoad({
      query
    }) {
      console.log(query)
      this.queryData.query = query,
        this.loadGoodsList()

    },
    // 上拉刷新
    onPullDownRefresh() {
      this.queryData = {
          query: '', //关键字
          cid: '', //分类id
          pagenum: 1, //页吗
          pagesize: 10 //每页条数
        },
        this.goods = [],
        this.total = 0,
        this.loadGoodsList(() => {
          uni.stopPullDownRefresh()
        })
    },
    // 监听下拉刷新
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagessize >= this.total) return toast('亲，没有数据了')
      if (this.isLoading) return
      this.queryData.pagenum++
      this.loadGoodsList()
    }


  }
</script>

<style lang="scss">

</style>
