import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import storage from './FireStoreData'

export const UploadVidToStore = async (video,id, updateStatus) => {

    const storageRef = ref(storage.storage, `videos/${id+video.name}`);

    const getURL = () => {
        getDownloadURL(storageRef)
            .then((url) => {
                if (url) {
                    let data={
                        status: 'success',
                        url:url,
                        id:id
                    }
                    updateStatus(data)
                }
            })
            .catch((error) => {
                let data = {
                    status: 'failed',
                    id:id
                }
                updateStatus(data)
            });
    }
    await uploadBytes(storageRef, video).then((snapshot) => {
        getURL()

    });


}



