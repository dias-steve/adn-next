import imageViewerTypes from "./ImageViewer.types";

export const setImagesGallery = images => ({
    type: imageViewerTypes.SET_IMAGE_GALLERY,
    payload: images
});

export const setShowImageViewer = show => ({
    type: imageViewerTypes.SET_SHOW_IMAGE_VIEWER,
    payload: show
})
