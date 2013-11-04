Messages = new Meteor.Collection('messages')
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Messages.find().count() === 0) {
      Messages.insert({set: 'a', text: 'one'});
      Messages.insert({set: 'a', text: 'two'});
      Messages.insert({set: 'a', text: 'three'});
      Messages.insert({set: 'b', text: '1'});
      Messages.insert({set: 'b', text: '2'});
      Messages.insert({set: 'b', text: '3'});
    }
  });
}

if (Meteor.isClient) {

  Session.setDefault('foo', 'one');
  Session.setDefault('set', 'a');
  Session.setDefault('page', 'main');

  // This gets called too many times.
  Template.main.data = function () {
    console.log('getting foo.');
    return Session.get('foo');
  }

  Template.main.messages = function () {
    return Messages.find({set: Session.get('set')})
  };

  Template.main.events({
    'click input' : function (e, t) {
      console.log('-----switch set-----');
      if (Session.equals('set', 'a')) {
        Session.set('set', 'b');
      } else {
        Session.set('set', 'a');
      }
    }
  });

  Template.message.helpers({
    selected: function () {
      if (Session.get('foo') === this.text) {
        return 'selected';
      } else {
        return '';
      }
    }
  });

  Template.message.rendered = function () {
    console.log('message rendered.');
  }

  Template.message.events({
    'click li' : function (e, t) {
      console.log('+++++switch session+++++');
      Session.set('foo', e.currentTarget.innerText);
    }
  });

  Handlebars.registerHelper('page', function (page) {
    if (Session.equals('page', page)) {
     return Template._page;
    }
  });
}
