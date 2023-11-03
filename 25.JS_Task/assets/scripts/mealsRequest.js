// export let API_BASE_URL = 'http://localhost:3000';
let API_BASE_URL = 'http://localhost:3000';

export let BASE_URL = 'http://localhost:3000';
export async function getMealsAll(){
    let result;
    await axios.get(API_BASE_URL+"/meals")
    .then(res=>{result=res.data})
    return result;
}

export async function getMealsById(id) {
    let result;
    await axios.get(API_BASE_URL+"/meals/"+id)
    .then(res=>{result=res.data})
    return result;    
}

export function deleteMeals(id){
    axios.delete(API_BASE_URL+"/meals/"+id)
}
