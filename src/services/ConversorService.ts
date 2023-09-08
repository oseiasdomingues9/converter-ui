import api from "./API"

let base = "/"

export default{

    upload(operadora : any, versao : any, file : any){
        const formData = new FormData();
        formData.append('file', file);

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return api.post(base + 'upload/' + operadora + "/" + versao, formData, { headers, responseType: 'blob' })
    }

}