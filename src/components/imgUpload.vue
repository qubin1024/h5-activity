<template>
  <div class="upload-wrap">
     <input type="file"  size="1" id="file" name="file" :ref="'myFile'" accept="image/*" @change="fileChange($event)" style="display:none"/>
    <i class="fa fa-plus" style="font-size: 2rem;" @click="uploadAction('myFile')" v-show="!image" aria-hidden="true"></i>
    <span v-show="!image">{{placeholder}}</span>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  data () {
    return {
      image: null
    }
  },
  props: {
    placeholder: {
      type: String,
      default: "上传图片"
    }
  },
  methods: {
    uploadAction: function (myFile) {
        this.$refs[myFile].click();
        // wx.chooseImage({
			  //   count: 1, // 默认9
			  //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			  //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			  //   success: function (res) {//【思路第三步】
 
			  //   	var localIds = res.localIds;
			  //   	/*这一段是处理页面预览
			  //   	 * for (i in localIds) {
			  //   		var src = localIds[i];
		    // 			$input.closest(".weui-uploader__bd").find(".weui-uploader__files").append($(tmpl.replace('#url#', src).replace('#url#', src)));
			  //   	}
			  //   	//是否继续显示上传“+”按钮
			  //   	len = $input.closest(".weui-uploader__bd").find(".weui-uploader__files li").length;//已经选了几张？
			  //   	if(len >= UPDOC_CONST.MAX_FILE_NUM){
			  //   		$input.closest(".weui-uploader__input-box").hide();
			  //   	}
			  //   	var serverIds = [];*/
        //     console.log("图片： ", res)
			  //   	// _this.uploadImage(localIds,serverIds,call);
			  //   }
        // });
    },
    fileChange: function (e) {
        let fileName = e.target.value;
        const extName = fileName.substring(fileName.lastIndexOf('.') + 1);
        if (e.target.value === '') {
            return false;
        }

        // const isLt2M = e.target.files[0].size / 1024 / 1024 < 10;
        // if (!isLt2M) {
        //     this.$message.warning('文件大小10M以内');
        //     return;
        // }
        this.upload(e.target.files[0])
    },
    fileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picavalue = files[0];
      if (picavalue.size / 1024 / 1024 > 10) {
        alert("图片大小不能超过10M")
      } else {
        this.imgPreview(picavalue);
      }
    },
    //获取图片
    imgPreview(file, callback) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();
         
        //读取成功后的回调
        reader.onloadend = function(e) {
          let result = e.target.result
          let img = new Image();
          
          console.log("********未压缩前的图片大小********");
          console.log(result.length);
          img.onload = function() {
            let data = self.compress(img);
            self.imgUrl = result;
            let blob = self.dataURItoBlob(data);
            //console.log(blob);


            self.upload(file);

            // var formData = new FormData();
            // formData.append("file", blob);
            // console.log("********将blob对象转成formData对象********");
            // console.log(formData.get("file"));
            // let config = {
            // };
            // // 发送请求;
            // self.axios.post(self.uploadUrl.url, formData, config).then(res => {
            //   headers: { "Content-Type": "multipart/form-data" }
            //   // console.log(res);
            //   // console.log(res.data.data.resultftphost)
            //   // console.log(res.data.data.resulturl)
            //   // this.$emit('')
            //   if (res.data.code == 200) {
            //     self.$emit(
            //       "getImgsrc",
            //       res.data.data.resultftphost,
            //       res.data.data.resulturl
            //     );
            //   } else {
            //     self.$message({
            //       message: "图片上传失败，请重试",
            //       type: "warning"
            //     });
            //   }
            // });
          };
          img.src = result;
        };
       
        //将图片转成base64格式
        reader.readAsDataURL(file);
      }
    },
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      // console.log("*******压缩后的图片大小*******");
      // console.log(ndata)
      // console.log(ndata.length);
      return ndata;
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    upload(file) {
        let form = new FormData();
        form.append("upfile ", file);
        let config = {
              headers: { "Content-Type": "multipart/form-data" }
            };
        this.$http.post('https://wx.sharkmeida.cn/distribution/upload', form, config).then(({data}) => {
          if(data.code == '0000'){
            this.image = data.result.data
            this.$emit('uploadCallback', data.result.data);
          }
        })
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-wrap{
  height: 100%;
  border: 1px dashed #2196f3;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #2196f3;
  color: 0.3rem;
  align-items: center;
}
</style>
