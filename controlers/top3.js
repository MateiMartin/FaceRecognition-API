const handelTop3 = (req, res, db) => {
    return db.select('name', 'entries')
        .from('users')
        .orderBy('entries', 'desc')
        .limit(3)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(400).json('unable to get users'))
}

module.exports = {
    top: handelTop3
}