import httpService from "./httpService";

const qualityEndPoint = "quality/";

const QualityService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualityEndPoint);
        return data;
    }
};

export default QualityService;
