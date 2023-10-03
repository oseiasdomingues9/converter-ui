import axios from "./Axios"

let base = "/"

export default{

    upload(operadora : any, versao : any, file : any){
        let token = localStorage.getItem('token');
        
        const formData = new FormData();
        formData.append('file', file);

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return axios.post(base + 'upload/' + operadora + "/" + versao, formData, { headers, responseType: 'blob' })
    }

}