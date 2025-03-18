module.exports = function createMeeting(config) {
    const { meetings, params } = config;
    const { from: newFrom, to: newTo, persons } = params;

    function isOverlap(existingFrom, existingTo, newFrom, newTo) {
        return (
            (newFrom >= existingFrom && newFrom < existingTo) || 
            (newTo > existingFrom && newTo <= existingTo) ||    
            (newFrom <= existingFrom && newTo >= existingTo)  
        );
    }

    const conflictingPersons = new Set();
    for (const person of persons) {
    
        const personMeetings = meetings.filter(meeting => meeting.person === person);

        for (const meeting of personMeetings) {
            if (isOverlap(meeting.from, meeting.to, newFrom, newTo)) {
                conflictingPersons.add(person); 
                break;
            }
        }
    }

    if (conflictingPersons.size > 0) {
        return {
            status: 'REJECTED',
            reason: Array.from(conflictingPersons).sort(), 
        };
    }

    return {
        status: 'CREATED',
        reason: null, 
    };
};
