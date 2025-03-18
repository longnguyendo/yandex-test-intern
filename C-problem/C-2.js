async function getRecord(url, recordId) {
    let response;
    try {
        response = await fetch(url);
    } catch (error) {
        throw error;
    }

    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new Error(`Неожиданный формат данных: ${url}`);
    }

    if (!data.records || !Array.isArray(data.records)) {
        throw new Error(`Неожиданный формат данных: ${url}`);
    }

    const record = data.records.find(r => r.id === recordId);
    if (!record) {
        throw new Error(`Запись не найдена, id: ${recordId}`);
    }

    return {
        getTitle: () => record.title,
        getSummary: () => record.summary,
        getDetails: () => record.details,
    };
}

module.exports = getRecord;