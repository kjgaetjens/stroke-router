module.exports = {
  up(db) {
    return db.collection('hospitals').update(
      {
        coords: {$exists: true}
      },
      {
        $set: {
          loc: {
            type: 'Point',
            coordinates: {
              lat: "$coords.lat",
              lng: "$coords.lng"
            }
          }
        },
        $unset: {coords: ""}
      },
      {multi: true}
    )
  },
  down(db) {
    return db.collection('hospitals').update(
      {
        loc: {$exists: true}
      },
      {
        $unset: {loc: ""},
      },
      {multi: true}
    )
  }
};
