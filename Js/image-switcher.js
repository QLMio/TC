<script src="//geoip-js.com/js/apis/geoip2/v2.1/geoip2.js" type="text/javascript"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    geoip2.country(function(geoipResponse) {
      var images = document.getElementsByTagName('img');
      for (var i = 0; i < images.length; i++) {
        var img = images[i];
        var src = img.getAttribute('src');
        if (src.includes('github.com') || src.includes('gitee.com')) {
          if (geoipResponse.country.iso_code === 'CN') {
            img.src = src.replace('github.com', 'gitee.com');
          } else {
            img.src = src.replace('gitee.com', 'github.com');
          }
          img.onerror = function() {
            if (this.src.includes('gitee.com')) {
              this.src = this.src.replace('gitee.com', 'github.com');
            } else if (this.src.includes('github.com')) {
              this.src = this.src.replace('github.com', 'gitee.com');
            }
          };
        }
      }
    }, function(error) {
      console.log('Error occurred: ' + error);
    });
  });
</script>
