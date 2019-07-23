<template>
  <section data-v-a7cc81fa class="container">
    <el-row type="flex" justify="space-between">
      <!-- 发表新攻略部分 -->
      <div class="main">
        <h2>发表新攻略</h2>
        <p class="fxyj">分享你的个人游记，让更多人看到哦！</p>
        <!-- 表单编辑部分 -->
        <form class="main-form">
          <!-- 编辑表单标题部分 -->
          <div class="w-biaoti">
            <input type="text" placeholder="请输入标题" class="w-input" v-model="form.biaoti" />
          </div>
          <!-- 富文本框内容编辑部分 -->
          <div id="app" class="main-fu">
            <VueEditor
              v-if="isShow"
              :config="config"
              ref="vueEditor"
              class="main-fu-c"
              v-model="form.nei"
            />
          </div>
          <!-- 编辑搜索游玩城市部分 -->
          <div>
            <label class="label">选择城市</label>
            <el-autocomplete
              v-model="form.destCity"
              :fetch-suggestions="queryDestSearch"
              placeholder="请搜索游玩城市"
              @select="handleDestSelect"
              class="el-autocomplete"
            ></el-autocomplete>
          </div>
        </form>
        <div class="submit-side">
          <!-- 点击发布 -->
          <button type="button" class="button" @click="fabu">发布</button>
          <span class="span">
            <span>或者</span>
            <!-- 点击存入草稿箱 -->
            <a href="javascript:;" @click="dianji">保存到草稿</a>
          </span>
        </div>
      </div>
      <!-- 草稿箱部分 -->
      <div class="caogao">
        <div class="caogao-bian">
          <h4 class="caogao-xiang">草稿箱 ({{listConner.length}})</h4>
          <div v-for="(item,index) in listConner" :key="index" class="caogao-bian-conner">
            <!-- 点击草稿箱内容重新编辑 -->
            <div @click="fanhui(item)" class="shubiao">
              <span>{{item.biaoti}}</span>
              <i class="el-icon-edit"></i>
            </div>
            <div>{{item.time}}</div>
          </div>
        </div>
      </div>
    </el-row>
  </section>
</template>

<script>
// 引入富文本框
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  data() {
    return {
      // 草稿箱数据
      listConner: [],
      // 输入框内容列表
      form: {
        destCity: "",
        biaoti: "",
        nei: "",
        time: ""
      },
      isShow: false,
      // 富文本框插件配置
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          // url: "http://localhost:1337/upload",
          url: "http://157.122.54.189:9095/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://157.122.54.189:9095" + res.data[0].url);
          },
          uploadError() {},
          showProgress: true
        },

        uploadVideo: {
          url: "http://157.122.54.189:9095/upload",
          // url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
      // 把以前存在vuex的草稿拿出来
      this.listConner = [...this.$store.state.post.postInfo];
      // 如果草稿条数大于五条，规定只显示五条
      if (this.listConner.length > 5) {
        this.listConner.length = 5;
      }
    }, 1000);
  },
  methods: {
     // 搜索游玩城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch (value, cb) {
      const res = await this.findCity(value);
      if (res.length > 0) {
        // 默认选中第一个城市
        this.form.destCity = res[0].value;
      }
      cb(res);
    },
    findCity(destCity) {
      return new Promise((revoled, reject) => {
        if (destCity.trim().length == 0) {
          revoled([]);
          return;
        }
        this.$axios({
          url: "/cities",
          params: {
            name: destCity
          }
        }).then(res => {
          const { data } = res.data;
          const newData = data.map(v => {
            v.value = v.name.replace("市", "");
            return v;
          });
          revoled(newData);
        });
      });
    },
    handleDestSelect(item) {
      this.form.destCity = item.value;
    },
    // 草稿箱内容点击编辑
    dianji() {
      // 获取文本框内容
      this.form.nei = this.$refs.vueEditor.editor.root.innerHTML;
      // 获取系统时间
      let data = new Date();
      // 将时间转换成YYYY-MM-DD格式
      const timer = this.$moment(data).format("YYYY-MM-DD");
      this.form.time = timer;
      let obj = {...this.form}
      // 拿到存进vuex的数组
      this.listConner.unshift(obj);
      this.$store.commit("post/setpostInfo", this.listConner);
      // 添加到草稿箱后
      if (this.listConner.length > 5) {
        this.listConner.length = 5;
      }
      // 清空输入框
       this.form= {
        destCity: "",
        biaoti: "",
        time: ""
       }
      //  清空 富文本框
       this.$refs.vueEditor.editor.root.innerHTML = ''
    },
    // <!-- 点击草稿箱内容重新编辑方法 -->
    fanhui(value) {
      let { nei } = { ...value };
      this.form = { ...value };
      this.$refs.vueEditor.editor.root.innerHTML = nei;
    },
    // 发布方法
    fabu(){
      this.form.nei = this.$refs.vueEditor.editor.root.innerHTML
      const token = this.$store.state.user.userInfo.token;
      let vilde = true;
      this.form.nei = this.$refs.vueEditor.editor.root.innerHTML
      if(this.form.nei === '<p><br></p>') {
        this.$message.warning('请输入内容!')
        return
      }
           const rules = [
             {
               message:'请输入标题',
               rule:this.form.biaoti
             },
             {
               message:'请输入文本框内容',
               rule:this.form.nei
             },{
               message:'请输入搜索游玩城市',
               rule:this.form.destCity
             }
           ]
          rules.map(v =>{
            if(v.rule.length == 0){
              vilde = false;
              return setTimeout(()=>{
                this.$message.warning(v.message)
              },100)
            }
           })
           // 如果为false时需要转化为true 让他进入if return 停止
           if(!vilde) return
           let form = {
              content:this.form.nei,
              title:this.form.biaoti,
              city:this.form.destCity
            }
            
           this.$axios({
             baseURL:'http://157.122.54.189:9095',
             url:'/posts',
             method:'POST',
             data:form,
             headers:{
               Authorization: `Bearer ${token || `NO TOKEN`}`
             }
           }).then(res=>{
             if(res.data.message=="新增成功"){
                this.$message({
                 message: "发布成功",
                 type: "success"
              })
                this.$router.push({
                  path:'/post/detail'
                })
             }
           })
    }
  },
  components: {
    VueEditor
  }
};
</script>
<style lang="less" scoped>
.container[data-v-a7cc81fa] {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}
.main h2 {
  font-weight: 400;
  font-size: 22px;
  margin-bottom: 10px;
}
.main .fxyj {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.main .w-biaoti {
  margin-bottom: 22px;
}
.main-form {
  width: 750px;
  margin-bottom: 20px;
}
.main .main-fu {
  height: 458px;
}
.main .main-fu-c {
  // height: 100%;
  margin-bottom: 22px;
  height: 400px;
}
.main .submit-side a {
  color: orange;
}
.main .w-input {
  background-color: #fff;

  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  width: 100%;
}
.label {
  font-size: 14px;
  color: #606266;
}
.span {
  font-size: 14px;
}
.button {
  background-color: #409eff;
  width: 65px;
  height: 35px;
  cursor: pointer;
  color: #fff;
  border: none;
}
.caogao {
  width: 200px;
  color: #666;
}
.caogao .caogao-bian {
  border: 1px solid #ddd;
  padding: 10px;
}
.caogao .shubiao {
  cursor: pointer;
  color:#000;
}
.shubiao:hover {
  text-decoration: underline;
  color: #ffa500;
}
.caogao-bian-conner {
  margin-bottom: 10px;
  font-size: 14px;
}
.caogao-xiang {
  margin-bottom: 10px;
  font-weight: 700;
  color: #666;
}
</style>

