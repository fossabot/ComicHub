import { notification } from 'antd';
import fetch from 'dva/fetch';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error();
    error.name = response.status;
    error.message = `请求错误 ${response.status}: ${response.url}`;
    throw error;
}

const contentType = {
    'Content-Type': 'application/json; charset=utf-8',
};
/**
 *
 * 请求数据，返回promise
 * @export
 * @param {请求链接 string} url
 * @param {请求选项 object} options
 * @returns
 */
export default function request(url: string, options = {}) {
    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions: any = { ...defaultOptions, ...options };
    if (
        newOptions.method === 'POST' ||
        newOptions.method === 'PUT' ||
        newOptions.method === 'DELETE'
    ) {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                ...contentType,
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers,
            };
        }
    }
    // @ts-ignore
    return fetch(url, newOptions)
        .then(checkStatus)
        .then((response: any) => {
            return response.json();
        })
        .catch((error: Error) => {
            const title = codeMessage[error.name] || error.name || '请求错误';
            notification.error({
                description: error.message,
                duration: 0,
                message: title,
            });
        });
}
