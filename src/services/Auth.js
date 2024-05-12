import Api from "./Api";

const LOGIN_URL="property_manager_login"

//Login Api 
export const loginApi = async ( data) => {
    try {
        let result = await Api.post(LOGIN_URL, data);
        if (result.status === 200 ) {
            if(result.data.status ===200){
                return result;
            }
            else{
                return result.data.message;
            }         
        }     
    } catch (error) {
        if (error) {

            return error;
        }
    }
};

