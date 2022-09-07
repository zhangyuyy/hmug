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
  }
export default toast
