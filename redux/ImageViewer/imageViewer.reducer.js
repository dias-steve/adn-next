import imageViewerTypes from "./imageViewer.types";

export const INITIAL_STATE = {
    image_gallery:[],
    show_image_viewer: false,
};

const imageViewerReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case imageViewerTypes.SET_SHOW_IMAGE_VIEWER:
            return {
                ...state,
                show_image_viewer: action.payload
            }

        case imageViewerTypes.SET_IMAGE_GALLERY:
            return {
                ...state,
                image_gallery: action.payload
            }

    
        default:
            return state;
    }
}

export default  imageViewerReducer;