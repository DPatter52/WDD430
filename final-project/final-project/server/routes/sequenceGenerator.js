var Sequence = require('../models/sequence');

var maxBookId;
var maxReviewId;
var maxUserId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxBookId = sequence.maxBookId;
      maxReviewId = sequence.maxReviewId;
      maxUserId = sequence.maxUserId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'Books':
      maxBookId++;
      updateObject = {maxBookId: maxBookId};
      nextId = maxBookId;
      break;
    case 'Reviews':
      maxReviewId++;
      updateObject = {maxReviewId: maxReviewId};
      nextId = maxReviewId;
      break;
    case 'Users':
      maxUserId++;
      updateObject = {maxUserId: maxUserId};
      nextId = maxUserId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
