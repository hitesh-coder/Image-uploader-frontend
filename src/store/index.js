import { createStore } from "vuex";

export default createStore({
    state:{
        imageSrc: null,
        imageFile: null,
    },
    mutations:{
        setImgSrc(state,payload){
            state.imageSrc = payload
        },
        setImgFile(state,payload){
            state.imageFile = payload
        },
        removeFileData(state){
            state.imageFile = null
            state.imageSrc = null
        }
    },
    actions:{
        async setImgSrc(state,imgSrc){
            state.commit('setImgSrc',imgSrc)
        },
        async setImgFile(state,imgFile){
            state.commit('setImgFile',imgFile)
        },
        async removeFileData(state){
            state.commit('removeFileData')
        },
    },
    modules:{},
    getters:{
        imageSrc: state => state.imageSrc,
        imageFile: state => state.imageFile,
    }
});