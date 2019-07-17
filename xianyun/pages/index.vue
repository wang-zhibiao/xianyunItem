<template>
  <div class="container">
      <!-- 轮播图 -->
    <el-carousel  :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div class="banner-img" :style="`
                background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
                background-size:contain contain;
                `"></div>
      </el-carousel-item>
    </el-carousel>
     <!-- 搜索框 -->
        <div class="banner-content">
            <div class="search-bar">
                <!-- tab栏 -->
                <el-row 
                type="flex" 
                class="search-tab">
                    <!-- 用index与数据比较会返回boorean可以让谁显示active -->
                    <span 
                    v-for="(item, index) in options" 
                    :key="index"
                    :class="{active: index === currentOption}" 
                    @click="currrnt(index)"
                    >
                        <i>{{item.name}}</i>
                    </span>
                </el-row>
                
                <!-- 输入框 -->
                <el-row 
                type="flex" 
                align="middle" 
                class="search-input">
                    <input 
                :placeholder="options[currentOption].placeholder" 
                v-model="searchValue"
                   />
                    <i class="el-icon-search"></i>
                </el-row>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      banners: [
        // {
        //   url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        // }
      ],
      options: [      // 搜索框tab选项
                {
                    name: "攻略", 
                 	placeholder: "搜索城市", 
                 	pageUrl: "/post?city="
                },
                {
                    name: "酒店", 
                    placeholder: "请输入城市搜索酒店", 
                    pageUrl: "/hotel?city="},
                {
                    name: "机票", 
                    placeholder: "请输入出发地", 
                    pageUrl: "/air"
                }
            ],
            searchValue: "",    // 搜索框的值
            currentOption: 0,   // 当前选中的选项 
    }
  },
  mounted () {
    // 请求图片
    this.$axios({
      url:'/scenics/banners'
    })
    .then(res=>{
      this.banners = res.data.data
    })
  },
  methods: {
    // 改变当前页
    currrnt(index){
      this.currentOption = index
    }
  }
};
</script>

<style lang="less">
.container{
  // 版心
    min-width:1000px;
    margin:0 auto;
    // 最大的给相对定位
    position:relative;
    /deep/ .el-carousel__container{
        height:700px;
    }
    // 背景图
    .banner-img{
        width:100%;
        height:100%;
    }
    // 搜索框
    .banner-content{
      //提高层级
        z-index:9;
        width:1000px;
        // 相对定位-相对于container
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;
        // 搜索导航
        .search-bar{
            width:552px;
            margin:0 auto;
        }
        // 搜索导航按钮
        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }
            // 单个按钮
            span{
                width:82px;
                height:36px;
                //转化为块级
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }
        // 搜索框
        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;
            // 搜索表单input
            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }
            // 搜索图标
            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>
