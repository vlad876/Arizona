const express = require('express');
const fetch = require('node-fetch').default;

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/ping', async (req, res) => {
    try {
        const response = await fetch('https://arizona-ping.react.group/desktop/ping/Arizona/ping.json');
        
        if (!response.ok) throw new Error(`Сервер вернул статус ${response.status}`);

        const data = await response.json();
        
        if (!data.query || !Array.isArray(data.query)) {
            throw new Error('Некорректный формат данных от сервера');
        }

        
        res.json(data.query);
        
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ 
            error: 'Не удалось получить данные',
            details: error.message 
        });
    }
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));