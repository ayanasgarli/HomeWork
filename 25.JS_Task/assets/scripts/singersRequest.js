
// singersRequest.js starts here
let API_BASE_URL = 'http://localhost:3000';

export let BASE_URL = 'http://localhost:3000';

export async function getSingersAll(){
    let result;
    await axios.get(API_BASE_URL+"/singers")
    .then(res=>{result=res.data})
    return result;
}

export async function getSingersById(id) {
    let result;
    await axios.get(API_BASE_URL+"/singers/"+id)
    .then(res=>{result=res.data})
    return result;    
}

export function deleteSingers(id){
    axios.delete(API_BASE_URL+"/singers/"+id)
}

