angular.module('starter.services', [])

.factory('Evictions', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var evictions = [{
      id: 1,
      title: '#FamiliaTala',
      date: '2016-08-16',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Barcelona'
  }, {
      id: 2,
      title: '#desnonament 2',
      date: '2016-08-01',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Barcelona'
  }, {
      id: 3,
      title: '#desnonament 3',
      date: '2016-08-05',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Barcelona'
  }, {
      id: 4,
      title: 'desnonament 4',
      date: '2016-08-23',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Barcelona'
  }, {
      id: 5,
      title: '#desnonament 5',
      date: '2016-08-18',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Barcelona'
  }, {
      id: 6,
      title: '#desnonament 6',
      date: '2016-08-30',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Barcelona'
  }, {
      id: 7,
      title: '#desnonament 7',
      date: '2016-08-24',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Sabadell'
  }, {
      id: 8,
      title: '#desnonament 8',
      date: '2016-09-04',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Sabadell'
  }, {
      id: 9,
      title: '#desnonament 9',
      date: '2016-08-19',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval',
      assembly: 'PAH Bages'
  }];



  return {
    all: function() {
      return evictions;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(evictionId) {
      for (var i = 0; i < evictions.length; i++) {
        if (evictions[i].id === parseInt(evictionId)) {
          return evictions[i];
        }
      }
      return null;
    }
  };
})


.factory('Assemblies', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var assemblies = [{
      id: 1,
      name: 'PAH Bages',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      id: 2,
      name: 'PAH Barcelona',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      id: 3,
      name: 'PAH Sabadell',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      id: 4,
      name: 'PAH 4',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      id: 5,
      name: 'PAH 5',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      id: 6,
      name: 'PAH 6',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      id: 7,
      name: 'PAH 7',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      id: 8,
      name: 'PAH 8',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      id: 9,
      name: 'PAH 9',
      mail: 'contacte@pah.com',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }];



  return {
    all: function() {
      return assemblies;
    },
    remove: function(assembly) {
      chats.splice(chats.indexOf(assembly), 1);
    },
    get: function(assemblyId) {
      for (var i = 0; i < assemblies.length; i++) {
        if (assemblies[i].id === parseInt(assemblyId)) {
          return assemblies[i];
        }
      }
      return null;
    }
  };
});
