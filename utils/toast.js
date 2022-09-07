function toast(title, icon, duration) {
  uni.showToast({
    title,
    icon,
    duration
  })
}
toast.err = function(title, duration = 3000) {
    uni.showToast({
      title,
      icon: 'error',
      duration
    })
  },
  toast.succeed = function(title, duration = 3000) {
    uni.showToast({
      title,
      icon: 'succeed',
      duration
    })
  },
  // loading
  toast.loading = (title, duration) => {
    uni.showToast({
      title: '正在加载中...',
      icon: 'loading'
    })
  }
export default toast
