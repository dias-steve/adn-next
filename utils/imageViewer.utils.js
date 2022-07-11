import { setImagesGallery, setShowImageViewer} from '../redux/ImageViewer/imageViewer.actions'

export const handleSetImageGallery= (images, dispatch) => {
    dispatch(setImagesGallery(images))
};

export const handleSetShowImageViewer = (show, dispatch) => {
    dispatch(setShowImageViewer(show))
};