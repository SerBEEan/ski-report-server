const buildVisitor = (id, fullname, dateOfBirth, skiPass, coach, dateOfVisit, photo, sportType) => ({
    id,              // number,
    fullname,        // string,
    dateOfBirth,     // string,
    skiPass,         // TSkipass | null,
    coach,           // TCoach | null,
    dateOfVisit,     // string | null,
    photo,           // string | null,
    sportType,       // string,
});


module.exports = [
    buildVisitor(0, 'visitor 1', '23-05-1999', null, null, null, null, 'Лыжи'),
    buildVisitor(1, 'kke', '23-05-1999', null, null, null, null, 'Лыжи'),
];
