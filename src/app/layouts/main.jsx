import React from "react";
import useMockData from "../mockData/useMockData";

const Main = () => {
    const { init, curStatus, progress, error } = useMockData();
    const handleInit = () => { init(); };

    return (
        <>
            <h1> Main Page</h1>
            <h2>Инициализация данных Firebase</h2>
            <ul>
                <li>Статус: {curStatus}</li>
                {!!progress && <li>Прогресс: {progress}%</li>}
                {!!error && <li>Ошибка: {error}</li>}
                <button type="button" onClick={handleInit}>Инициализировать</button>
            </ul>
        </>);
};

export default Main;
