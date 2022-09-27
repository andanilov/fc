import { useEffect, useState } from "react";
import httpService from "../services/httpService";

import professions from "./professions.json";
import qualities from "./qualities.json";
import users from "./users.json";

const status = {
    before: "Не начата",
    pending: "В процессе",
    success: "Успешно",
    error: "Ошибка"
};

const allRequests = professions.length + qualities.length + users.length;

const useMockData = () => {
    const [curStatus, setCurStatus] = useState(status.before);
    const [passed, setPassed] = useState(0);
    const [error, setError] = useState();

    const insertData = async (url, dataObj) => {
        for (const row of dataObj) {
            await httpService.put(url + "/" + row._id, row);
            setPassed((prev) => prev + 1);
        }
    };

    const init = async () => {
        try {
            setPassed(0);
            setCurStatus(status.pending);

            await insertData("profession", professions);
            await insertData("quality", qualities);
            await insertData("user", users);
        } catch (error) {
            setCurStatus(status.error);
            setError(error.message);
        }
    };

    useEffect(() => { passed === allRequests && setCurStatus(status.success); }, [passed]);

    return {
        init,
        curStatus,
        progress: ~~((passed / allRequests) * 100),
        error
    };
};

export default useMockData;
