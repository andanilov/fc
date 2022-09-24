import httpService from "./httpService";

const professionEndPoint = "profession/";

const professionService = {
    fetchAll: async () => {
        const { data } = await httpService.get(professionEndPoint);
        return data;
    }
};

export default professionService;
