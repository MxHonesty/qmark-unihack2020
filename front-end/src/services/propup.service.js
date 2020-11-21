import http from "../http-common";

class PropupDataService {
    getAll() {
        return http.get("/donatii");
    }
    
    get(id){
        return http.get(`/donatii/${id}`);
    }
    
    create(data){
        return http.post("/donatii", data);
    }
    
    deleteAll(){
        return http.delete("/donatii");
    }
    
    getFirst(number){
        return http.get(`/donatii?k=${number}`)
    }
}

export default new PropupDataService();
