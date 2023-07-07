import axiosClient from "./axiosClient"

export const category = {
    v1: 'v1',
    videos: 'videos'
}


const pexelsApi = {
    getImageList : (params)=>{
        const url = "v1/curated/"
        return axiosClient.get(url, params)
    },

    getImageById : (id, params)=>{
        const url = "v1/photos/" + id
        return axiosClient.get(url, params)
    },

    getVideoList : (params)=>{
        const url = 'videos/popular/'
        return axiosClient.get(url, params)
    },

    getVideoById : (id, params)=>{
        const url = 'videos/videos/' + id
        return axiosClient.get(url, params)
    },

    search: (type,params) =>{
        const url = '/'+category[type]+'/search/'
        return axiosClient.get(url, params)
    }
}

export default pexelsApi