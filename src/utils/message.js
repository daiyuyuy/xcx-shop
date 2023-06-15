export function showToast(
  title = "请求失败啦",
  duration = 1500,
  icon = "none"
) {
  uni.showToast({
    title,
    duration,
    icon,
  });
}
