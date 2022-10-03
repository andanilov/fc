import httpService from "./httpService";
const userEndPoint = "user/";

const userService = {
    fetchAll: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },

    create: async (payload) => {
        const { data } = await httpService.put(userEndPoint + payload._id, payload);
        return data;
    },

    getById: async (_id) => {
        const { data } = await httpService.get(userEndPoint + _id);
        return data;
    }
};

export default userService;
