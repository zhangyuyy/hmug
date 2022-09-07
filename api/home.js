import fly from "@/utils/request.js"

// 获取轮播图
export const getBanners = () => fly.get('/home/swiperdata')
// 导航分类
export const getNavs = () => fly.get('/home/catitems')
// 楼层图片
export const getFloors = () => fly.get('/home/floordata')
