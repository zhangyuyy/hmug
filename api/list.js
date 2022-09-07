import fly from "@/utils/request.js"
export const getGoodstList = (data) => fly.get('/goods/search', data)
