<template>
    <div class="app-container">
        <div class="search-area">
            <input
                v-model="keyword"
                type="text"
                placeholder="请输入关键词"
                class="search"
                @keydown.enter="search"
            />
            <div class="search-btn" @click="search">搜索</div>
        </div>
        <div class="card-list">
            <el-card
                v-for="(item, index) in navigationList"
                :key="index"
                class="card"
                :body-style="{ padding: '0' }"
            >
                <div class="card-header">
                    <span>{{ item.title }}</span>
                </div>
                <div class="card-body">
                    <a
                        v-for="(i, idx) in item.contentList"
                        :key="idx"
                        :href="i.link"
                        class="content-item"
                        target="_blank"
                    >
                        <div class="img-box">
                            <img
                                v-if="i.img"
                                class="img"
                                :alt="i.name"
                                :title="i.name"
                                :src="i.img"
                            />
                            <p
                                v-else
                                class="img-name"
                                :style="{color: i.color}"
                            >
                                {{ i.name }}
                            </p>
                        </div>
                    </a>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navigationList: [],
            keyword: ""
        };
    },
    computed: {
    },
    created() {
        this.init();
    },
    methods: {
        search() {
            if (!this.keyword) return;
            const api = `https://kaifa.baidu.com/searchPage?wd=${this.keyword}`;
            window.open(api);
        },
        init() {
            this.navigationList = [
                {
                    title: "常用工具",
                    contentList: [
                        {
                            name: "json.cn",
                            link: "https://json.cn",
                            img: "",
                            color: "#333"
                        }, {
                            name: "tiny/png",
                            link: "https://tinypng.com/",
                            img: "",
                            color: "#333"
                        }, {
                            name: "tool工具箱",
                            link: "https://tool.lu/",
                            img: "",
                            color: "#333"
                        }
                    ]
                }, {
                    title: "开发者社区",
                    contentList: [
                        {
                            name: "掘金",
                            link: "https://juejin.cn/",
                            img: "https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/dcec27cc6ece0eb5bb217e62e6bec104.svg"
                        }, {
                            name: "hello worle",
                            link: "https://www.helloworld.net/",
                            img: "https://www.helloworld.net/img/logo.svg"
                        }, {
                            name: "思否",
                            link: "https://segmentfault.com/",
                            img: "https://cdn.segmentfault.com/r-ffdb7497/static/logo-b.d865fc97.svg"
                        }, {
                            name: "简书",
                            link: "https://www.jianshu.com/",
                            img: "",
                            color: "#333"
                        }, {
                            name: "csdn",
                            link: "https://blog.csdn.net/",
                            img: "",
                            color: "#333"
                        }, {
                            name: "博客园",
                            link: "https://www.cnblogs.com/",
                            img: "https://www.cnblogs.com/images/logo.svg?v=R9M0WmLAIPVydmdzE2keuvnjl-bPR7_35oHqtiBzGsM"
                        }, {
                            name: "开源中国",
                            link: "https://www.oschina.net/",
                            img: "",
                            color: "#333"
                        }, {
                            name: "开发者头条",
                            link: "https://toutiao.io/",
                            img: "",
                            color: "#333"
                        }
                    ]
                }, {
                    title: "官方文档",
                    contentList: [
                        {
                            name: "vue.js",
                            link: "https://cn.vuejs.org/",
                            img: "https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.48/dist/img/vuejs.png",
                            color: "#333"
                        }, {
                            name: "react.js",
                            link: "https://reactjs.bootcss.com/",
                            img: "https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.48/dist/img/react.png",
                            color: "#333"
                        }, {
                            name: "webpack",
                            link: "https://www.webpackjs.com/",
                            img: "https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600",
                            color: "#333"
                        }, {
                            name: "gulp",
                            link: "https://www.gulpjs.com.cn/",
                            img: "https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.48/dist/img/gulpjs.png",
                            color: "#333"
                        }, {
                            name: "vite",
                            link: "https://vitejs.bootcss.com/",
                            img: "https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.48/dist/img/vitejs.png",
                            color: "#333"
                        }, {
                            name: "node.js",
                            link: "https://www.nodeapp.cn/",
                            img: "https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.48/dist/img/nodejs.png",
                            color: "#333"
                        }, {
                            name: "koa.js",
                            link: "https://koa.bootcss.com/",
                            img: "",
                            color: "#333"
                        }, {
                            name: "egg.js",
                            link: "https://eggjs.org/zh-cn/",
                            img: "https://zos.alipayobjects.com/rmsportal/VTcUYAaoKqXyHJbLAPyF.svg",
                            color: "#333"
                        }, {
                            name: "sequelize",
                            link: "https://www.sequelize.com.cn/",
                            img: "https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.48/dist/img/sequelize.png",
                            color: "#333"
                        }
                    ]
                }, {
                    title: "常用插件",
                    contentList: [
                        {
                            name: "animejs",
                            link: "https://www.animejs.cn/",
                            img: "",
                            color: "#333"
                        }
                    ]
                }, {
                    title: "优秀博客",
                    contentList: [
                        {
                            name: "阮一峰日志",
                            link: "http://www.ruanyifeng.com/home.html",
                            img: "",
                            color: "#333"
                        }
                    ]
                }
            ];
        }
    }
};
</script>
<style lang="scss" scoped>
.app-container{
    .search-area{
        text-align: center;
        padding: 70px 0 100px 0;
    }
    .search{
        border-top: 2px solid #eee;
        border-right: none;
        border-bottom: 2px solid #eee;
        border-left: 2px solid #eee;
        display: inline-block;
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        box-sizing: border-box;
        border-radius: 15px 0 0 15px;
        padding-left: 15px;
        width: 450px;
        outline: none;
        &:hover{
            border-color: #333;
        }
    }
    .search-btn{
        display: inline-block;
        height: 45px;
        line-height: 45px;
        background-color: #333;
        color: #FFFFFF;
        font-size: 16px;
        padding: 0 15px;
        box-sizing: border-box;
        border-radius: 0 15px 15px 0;
        width: 100px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
    }
    .card-list{
        display: flex;
        flex-wrap: wrap;
        .card{
            flex-shrink: 0;
            width: 30%;
            margin-right: 3%;
            margin-bottom: 20px;
            min-height: 200px;
            border-radius: 10px;
            .card-header{
                font-size: 14px;
                border-bottom: 1px solid #ebeef5;
                padding: 10px;
            }
            .card-body{
                font-size: 14px;
                padding: 20px;
                display: flex;
                flex-wrap: wrap;
                .content-item{
                    flex-shrink: 0;
                    margin: 0 15px 15px 0;
                    .img-box{
                        min-width: 70px;
                        padding: 5px;
                        height: 30px;
                        border-radius: 10px;
                        overflow: hidden;
                        background-color: #edfbf4;
                        position: relative;
                        overflow: hidden;
                        .img-name{
                            margin: 0;
                            text-align: center;
                            font-size: 16px;
                            font-family: cursive;
                            font-weight: bold;
                        }
                        .img{
                            width: 90%;
                            max-width: 65px;
                            height: auto;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
}
</style>
