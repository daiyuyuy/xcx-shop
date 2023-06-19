export function showToast(
  title = "请求失败啦",
  duration = 2000,
  icon = "none"
) {
  uni.showToast({
    title,
    duration,
    icon,
  });
}
