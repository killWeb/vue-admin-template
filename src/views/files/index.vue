<template>
    <div class="app-container">
        <el-form
            ref="form"
            :model="query"
            :inline="true"
            label-position="right"
            label-width="90px"
            size="mini"
        >
            <el-form-item label="文件名称：">
                <el-input v-model.trim="query.name" placeholder="请输入文件名称" clearable />
            </el-form-item>
            <el-form-item label="文件类型：">
                <el-select v-model="query.type" placeholder="请选择文件类型" clearable>
                    <el-option
                        v-for="(v, k) in fileTypeMap"
                        :key="k"
                        :label="v"
                        :value="k"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间：">
                <el-date-picker
                    v-model="createDateTime"
                    type="datetimerange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    clearable
                />
            </el-form-item>
            <div class="clearfix mb20">
                <el-form-item class="fl">
                    <el-button type="primary" icon="el-icon-plus" @click="handleShow('add')">上传文件</el-button>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button id="keyupEnter" type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
        >
            <el-table-column align="center" label="序号" width="100px">
                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column align="center" width="100px" label="名称" prop="name" />
            <el-table-column label="内容" align="center">
                <template slot-scope="scope">
                    <img v-if="scope.row.type === 'IMAGE'" class="content-img" :src="scope.row.path" alt="图片" />
                </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ parseTime(scope.row.created_at) }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <!-- <el-button type="text">编辑</el-button> -->
                    <el-button type="text" @click="delFile(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="action-wrap mt20">
            <pagination v-show="total>0" :total="total" :page.sync="query.currentPage" :limit.sync="query.pageSize" @pagination="search" />
        </div>
        <UploadFile :dialog-show.sync="dialogShow" />
    </div>
</template>

<script>
import { delFile, getList } from "@/api/files";
import { parseTime } from "@/utils";
import UploadFile from "./components/UploadFile.vue";
import Pagination from "@/components/Pagination";

const defaultQuery = {
    name: "",
    type: "ALL",
    startTime: "",
    endTime: "",
    currentPage: 1,
    pageSize: 10
};
export default {
    components: { UploadFile, Pagination },
    data() {
        return {
            list: null,
            listLoading: true,
            parseTime,
            fileTypeMap: {
                "IMAGE": "图片",
                "VIDEO": "视频",
                "OTHER": "其他",
                "ALL": "全部"
            },
            query: {
                ...defaultQuery
            },
            createDateTime: [],
            dialogShow: false,
            total: 0
        };
    },
    computed: {
        startTime() {
            return this.createDateTime[0];
        },
        endTime() {
            return this.createDateTime[1];
        }
    },
    watch: {
        dialogShow(val) {
            if (val) return;
            this.search();
        }
    },
    created() {
        this.search();
    },
    methods: {
        delFile(scope) {
            const data = {
                id: scope.row.id
            };
            this.$confirm("确认删除吗？", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消"
            }).then(async () => {
                await delFile(data);
                this.$message.success("删除成功");
                this.search();
            });
        },
        handleShow(type) {
            if (type === "add") {
                this.dialogShow = true;
            }
        },
        reset() {
            this.query = defaultQuery;
            this.createDateTime = [];
        },
        async search() {
            const query = {
                ...this.query,
                startTime: this.startTime,
                endTime: this.endTime
            };
            if (query.type === "ALL") {
                query.type = "";
            }
            this.listLoading = true;
            const res = await getList(query);
            this.list = res.list;
            this.total = res.total;
            this.query.pageSize = res.pageSize;
            this.query.currentPage = res.currentPage;
            this.listLoading = false;
        }
    }
};
</script>
<style scoped>
.content-img{
    width: 250px;
}
</style>
