module.exports = function createMeeting(config) {
    const { meetings, params } = config;
    const { from, to, persons } = params;

    const busyPersons = [];

    for (const person of persons) {
        for (const meeting of meetings) {
            if (meeting.person === person) {
                if ((from < meeting.to && to > meeting.from)) {
                    busyPersons.push(person);
                    break;
                }
            }
        }
    }
    if (busyPersons.length > 0) {
        return {
            status: 'REJECTED',
            reason: busyPersons.sort(),
        };
    }

    return {
        status: 'CREATED',
    };
};
