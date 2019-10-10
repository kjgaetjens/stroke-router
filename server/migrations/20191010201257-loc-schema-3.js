module.exports = {
  up(db) {
    return db.collection('hospitals').createIndex( { loc : "2dsphere" } )
  },

  down(db) {
    return db.collection('hospitals').dropIndex('loc')
  }
};

