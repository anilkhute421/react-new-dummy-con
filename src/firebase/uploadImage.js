import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import storage from './FireStoreData'
export const UploadImage = async (img,id, name, updateStatus) => {

    const storageRef = ref(storage.storage, `images/${id+name}`);
    const getURL = () => {
   
        getDownloadURL(storageRef)
            .then((url) => {
                if (url) {
                    let data = {
                        status: 'success',
                        url: url,
                        id: id
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
    await uploadBytes(storageRef, img).then((snapshot) => {
      

        getURL()

    });


}
