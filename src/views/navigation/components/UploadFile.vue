<template>
    <el-dialog
        :title="'上传文件'"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        width="45%"
        :before-close="handleHide"
    >
        <el-form
            ref="configForm"
            :model="configForm"
            label-width="130px"
            label-position="right"
        >
            <el-form-item label="文件名称：">
                <el-input v-model.trim="configForm.name" placeholder="请输入文件名称" clearable />
            </el-form-item>
            <el-form-item label="文件路径：">
                <el-input v-model.trim="configForm.path" placeholder="请输入文件路径" clearable />
            </el-form-item>
            <el-form-item label="文件内容：">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="action-wrap clearfix">
            <div class="fr">
                <el-button @click="handleHide">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">提 交</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { addFile } from "@/api/files";
export default {
    props: {
        dialogShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            configForm: {
                name: "",
                path: ""
            }
        };
    },
    methods: {
        handleHide() {
            this.$emit("update:dialogShow", false);
        },
        async handleSubmit() {
            const str = this.configForm.path.split(".").reverse()[0].toUpperCase();
            let type = null;
            if (["PNG", "JPG", "JPEG", "GIF"].includes(str)) {
                type = "IMAGE";
            } else if (["MP4"].includes(str)) {
                type = "VIDEO";
            } else {
                type = "OTHER";
            }
            const filesList = [];
            filesList.push({
                ...this.configForm,
                type
            });
            await addFile({
                filesList: JSON.stringify(filesList)
            });
            this.handleHide();
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
