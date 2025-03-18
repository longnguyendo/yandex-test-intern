async function getRecord(url, recordId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data || !Array.isArray(data.records)) {
            throw new Error(`Неожиданный формат данных: ${url}`);
        }
        
        const record = data.records.find(item => item.id === recordId);
        
        if (!record) {
            throw new Error(`Запись не найдена, id: ${recordId}`);
        }
        
        return {
            getTitle: () => record.title,
            getSummary: () => record.summary,
            getDetails: () => record.details
        };
        
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = getRecord;
