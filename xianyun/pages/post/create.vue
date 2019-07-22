<template>
  <section data-v-a7cc81fa class="container">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <h2>发表新攻略</h2>
        <p class="fxyj">分享你的个人游记，让更多人看到哦！</p>
        <form class="main-form">
          <div class="w-biaoti">
            <input type="text" placeholder="请输入标题" class="w-input" v-model="form.biaoti" />
          </div>
          <div id="app" class="main-fu">
            <VueEditor
              v-if="isShow"
              :config="config"
              ref="vueEditor"
              class="main-fu-c"
              v-model="form.nei"
            />
          </div>

          <div>
            <label class="label">选择城市</label>
            <el-autocomplete
              v-model="form.destCity"
              :fetch-suggestions="queryDestSearch"
              placeholder="请搜索到达城市"
              @select="handleDestSelect"
              class="el-autocomplete"
            ></el-autocomplete>
          </div>
        </form>
        <div class="submit-side">
          <button type="button" class="button" @click="fabu">发布</button>
          <!-- <el-button type="primary" class="button">发布</el-button> -->
          <span class="span">
            或者
            <a href="javascript:;" @click="dianji">保存到草稿</a>
          </span>
        </div>
      </div>
      <div class="caogao">
        <div class="caogao-bian">
          <h4 class="caogao-xiang">草稿箱 ({{listConner.length}})</h4>
          <div v-for="(item,index) in listConner" :key="index" class="caogao-bian-conner">
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
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  data() {
    return {
      listConner: [],
      form: {
        destCity: "",
        biaoti: "",
        nei: "",
        time: ""
      },
      isShow: false,
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
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
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
    }, 1);
  },
  methods: {
    async queryDestSearch(value, cb) {
      const res = await this.findCity(value);
      if (res.length > 0) {
        this.form.destCity = res.value;
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
          console.log(res.data);
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
    dianji() {
      // this.$refs.form.validate(valid => {
      //   if (valid) {

      this.form.nei = this.$refs.vueEditor.editor.root.innerHTML;
      let data = new Date();
      const timer = this.$moment(data).format("YYYY-MM-DD");
      this.form.time = timer;
      console.log(this.form);
      this.listConner.unshift(this.form);
      if (this.listConner.length > 5) {
        this.listConner.length = 5;
      }
       this.form= {
        destCity: "",
        biaoti: "",
        nei: "",
        time: ""
       }
      // console.log(this.listConner);

      this.$store.commit("post/setpostInfo", this.listConner);

      // setTimeout(() => {}, 1);
      //   }
      // });
    },
    fanhui(value) {
      let { nei } = { ...value };
      this.form = { ...value };
      this.$refs.vueEditor.editor.root.innerHTML = nei;
    },
    fabu(){}
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
  // font-size: 14px;
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
  font-weight: 400;
  color: #666;
}
//
</style>

