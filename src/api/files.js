import request from '@/utils/request'

/**
 * @description 获取文件列表
 * @param {*} data
 * @returns
 */
export function getList(data) {
    return request({
        url: '/api/files/list',
        method: 'post',
        data
    })
}
/**
 * @description 上传文件
 * @param {*} data
 * @returns
 */
export function addFile(data) {
    return request({
        url: '/api/files/add',
        method: 'post',
        data
    })
}
