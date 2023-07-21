import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Api {
    url: string,
    method: string,
    token: string,
    data: any
}

const fetch_Api = async function (params: Api): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
        headers: {
            "Authorization": `Bearer  ${params.token}`,
            "Content-Type": "application/json"
        },
        url: params.url,
        method: params.method,
        data: params.data
    }
    try {
        const response: AxiosResponse = await axios(config);
        return response
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`)
    }
}


export default fetch_Api