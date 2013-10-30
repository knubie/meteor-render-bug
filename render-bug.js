Messages = new Meteor.Collection('messages')

if (Meteor.isClient) {

  Template.main.messages = function () {
    if (Meteor.user()) {
      return Messages.find({})
    } else {
      return []
    }
  };

  Template.main.events({
    'click [type="button"]' : function () {
      if (! Meteor.user().profile) {
        Meteor.users.update(Meteor.userId(), { $set: {'profile.foo': 'bar'} })
      } else if (Meteor.user().profile.foo === 'bar') {
        Meteor.users.update(Meteor.userId(), { $set: {'profile.foo': 'baz'} })
      } else {
        Meteor.users.update(Meteor.userId(), { $set: {'profile.foo': 'bar'} })
      }
    },
    'submit #new-message' : function (e, t) {
      e.preventDefault();
      Messages.insert({text: t.find('[type="text"]').value});
      t.find('[type="text"]').value = ''
    }
  });
}
