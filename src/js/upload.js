// 上传图片模板
// req 文件属性
// type 要上传的文件夹
// fn 上传成功以后的回调函数
export function upload(req,type, fn) {
  if (req.file.size / 1024 / 1024 > 2) {
    this.$message.error("上传图片不能大于2M");
    return;
  }
  let filetype = "";
  if (req.file.type === "image/png") {
    filetype = "png";
  } else {
    filetype = "jpg";
  }
  // 重命名要上传的文件
  const keyname = type+"/" + new Date().getTime() + "_" + Math.floor(Math.random() * 100) + "." + filetype;
  this.$get(this.$api.qnGetToken, { type: type }).then(res => {
    let formdata = new FormData();
    formdata.append("file", req.file);
    formdata.append("token", res.data.up_token);
    formdata.append("key", keyname);
    this.$post(this.$api.qiNiuUpload, formdata, "multipart/form-data").then(data => {
      fn(data)
    });
    

  });
};

