// 在Hexo主题的 `source/js` 目录下创建一个新的JS文件，例如 `image-loader.js`
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有图片元素
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // 检查图片URL是否为GitHub或Gitee的图床
    if (/github\.com/.test(img.src) || /gitee\.com/.test(img.src)) {
      // 创建一个新的Image对象用于测试图片加载
      const testImage = new Image();
      testImage.onload = function() {
        // 如果图片加载成功，不做任何操作
      };
      testImage.onerror = function() {
        // 如果图片加载失败，尝试切换图床
        switchImageSource(img);
      };
      // 尝试加载图片
      testImage.src = img.src;
    }
  });

  function switchImageSource(img) {
    // 根据用户的地理位置切换图片源
    const isChina = (new Date().getTimezoneOffset() / -60) === 8; // 中国标准时间为GMT+8
    let newSrc;
    if (isChina) {
      // 如果用户在中国，将GitHub图床链接替换为Gitee
      newSrc = img.src.replace('github.com', 'gitee.com');
    } else {
      // 如果用户不在中国，将Gitee图床链接替换为GitHub
      newSrc = img.src.replace('gitee.com', 'github.com');
    }
    // 更新图片源并重新加载
    img.src = newSrc;
  }
});
