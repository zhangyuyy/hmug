<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in banners" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image @click='goGoodsDetail(item.goods_id)' :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view @click='clickNav(item)' class="nav-item" v-for="(item, i) in  navs" :key="i">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floors" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>

        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image @click='goGoodsList(item.product_list[0].navigator_url)'
              :style="{width:item.product_list[0].image_width + 'rpx'}" :src='item.product_list[0].image_src'
              class="left-img"></image>
          </view>

          <view class="right-img-box">
            <view @click='goGoodsList(item2.navigator_url)' class="right-img-item"
              v-for="(item2,i) in item.product_list " :key='
              i' v-if='i !==0'>
              <image class="image" :style="{width:item2.image_width + 'rpx'}" :src='item2.image_src'></image>
            </view>
          </view>
        </view>
      </view>


    </view>
  </view>
</template>

<script>
  import {
    getBanners,
    getNavs,
    getFloors
  } from "@/api/home.js"
  export default {
    data() {
      return {
        banners: [],
        navs: [],
        floors: []
      };

    },
    methods: {
      // 轮播图
      async loadBanners() {
        const res = await getBanners()
        this.banners = res
      },
      // 导航分类
      async loadNavs() {
        const res = await getNavs()
        this.navs = res
      },
      // 楼层图片
      async loadFloors() {
        const res = await getFloors()
        console.log(res)
        this.floors = res
      },
      // 点击轮播图
      goGoodsDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?id=' + id
        })
      },
      // 点击导航分类
      clickNav(item) {
        // 判断如果名字等于分类，跳转
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 点击楼层图片
      goGoodsList(url) {
        console.log(url)
        uni.navigateTo({
          url: "/subpkg/goods_list/goods_list?" + url.split("?")[1]
        })
      }
    },
    onLoad() {
      this.loadBanners(),
        this.loadNavs(),
        this.loadFloors()
    }
  }
</script>

<style lang="scss">
  .topSearch {
    width: 750rpx;
    height: 70px;
    background-color: #ea5455;
    display: flex;
    // justify-content: center;
    overflow: hidden;

    .search_btn {
      width: 500rpx;
      height: 30px;
      margin: 26px 30px;

      background-color: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .text {
      width: 500rpx;
      height: 30px;
      color: red;

    }
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }


  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .image {
      height: 190rpx;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
