db.users.insertMany([
  {
    _id: ObjectId("61b711b7160d8033a7e850b9"),
    first_name: 'Adriaan',
    last_name: 'De Saeger',
    email: 'adriaan.de.saeger@student.howest.be',
    phonenumber: '123456789',
    company: "MYT",
    role: 'admin'
  },
  {
    first_name: 'Tijl',
    last_name: 'Ryckbosch',
    email: 'tijl.ryckbosch@student.howest.be',
    phonenumber: '123456789',
    company: "MYT",
    role: 'admin'
  },
  {
    first_name: 'Steffen',
    last_name: 'Germin',
    email: 'steffen.germin@student.howest.be',
    phonenumber: '123456789',
    company: "MYT",
    role: 'admin'
  },
  {
    first_name: 'Kjell',
    last_name: 'Maekelberg',
    email: 'kjell.maekelberg@student.howest.be',
    phonenumber: '123456789',
    company: "MYT",
    role: 'admin'
  },
  {
    first_name: 'Lennert',
    last_name: 'Commeine',
    email: 'lennert.commeine@student.howest.be',
    phonenumber: '123456789',
    company: "MYT",
    role: 'admin'
  },
  {
    _id: ObjectId("61b711b7160d8033a7e850b3"),
    first_name: 'Bo',
    last_name: 'Robbrecht',
    email: 'bo.robbrecht@student.howest.be',
    phonenumber: '123456789',
    company: "MYT",
    role: 'admin'
  },
  {
    _id: ObjectId("61b711b7160d8033a7e850b2"),
    first_name: 'Joe',
    last_name: 'Momma',
    email: 'joe.momma@joecorp.com',
    phonenumber: '123456789',
    company: "JoeCorp",
    role: 'admin'
}]);

db.buildings.insertMany([{
  name: 'Howest',
  address: {
    country: 'Belgium',
    postalcode: '8000',
    city: 'Brugge',
    street: 'Rijselstraat 5'
  },
  rooms: [
    {
      name: 'Room 0.1',
      type: 'normal',
      floor: 0,
      features: ["Fridge", "A/C unit"],
      incidentReports: [
        {
          _id: ObjectId(),
          user_id: "61b711b7160d8033a7e850b3",
          message: 'This room is dirty I never want to work here anymore...',
        },
      ],
      desks: [
        {
          name: 'Desk 1',
          incidentReports: [
            {
              _id: ObjectId(),
              user_id: "61b711b7160d8033a7e850b3",
              message: 'The pc crashed twice during my time here',
            },
            {
              _id: ObjectId(),
              user_id: "61b711b7160d8033a7e850b9",
              message: 'Very niceee WAAWAAAAAWIEEEEEWOOOOO',
            },
          ],
          bookings: [
            {
              _id: ObjectId(),
              user_id: "61b711b7160d8033a7e850b9",
              start_time: '2021-12-16 9:00',
              end_time: '2021-12-16 17:00',
              public: true,
            },
            {
              _id: ObjectId(),
              user_id: "61b711b7160d8033a7e850b3",
              start_time: '2021-12-17 9:00',
              end_time: '2021-12-17 17:00',
              public: true,
            },
          ],
        },
        {
          name: 'Desk 2',
          incidentReports: [],
          bookings: [],
        },
        {
          name: 'Desk 3',
          incidentReports: [],
          bookings: [],
        },
        {
          name: 'Desk 4',
          incidentReports: [],
          bookings: [],
        },
        {
          name: 'Desk 5',
          incidentReports: [],
          bookings: [],
        },
      ],
    },
    {
      name: 'Room 0.2',
      type: 'normal',
      floor: 0,
      features: [],
      incidentReports: [],
      desks: [
        {
          name: 'Desk 1',
          incidentReports: [],
          bookings: [],
        },
        {
          name: 'Desk 2',
          incidentReports: [],
          bookings: [],
        },
        {
          name: 'Desk 3',
          incidentReports: [],
          bookings: [],
        },
        {
          name: 'Desk 4',
          incidentReports: [],
          bookings: [],
        },
        {
          name: 'Desk 5',
          incidentReports: [],
          bookings: [],
        },
      ],
    },
  ],
},
{
  name: 'JoeCorp',
  address: {
    country: 'US&A',
    postalcode: '1234',
    city: 'Kazakhstan City',
    street: 'BoratStreet 21'
  },
  rooms: [
    {
      name: 'Room 1',
      type: 'normal',
      floor: 0,
      features: ["Chairs"],
      incidentReports: [
        {
          _id: ObjectId(),
          user_id: "61b711b7160d8033a7e850b2",
          message: 'This is so very excite',
        },
      ],
      desks: [
        {
          name: 'Desk 1',
          incidentReports: [
            {
              _id: ObjectId(),
              user_id: "61b711b7160d8033a7e850b2",
              message: 'I have work very good on this computer yesh I HAVE A CHAIR KING IN THE CASTLE',
            },
          ],
          bookings: [
            {
              _id: ObjectId(),
              user_id: "61b711b7160d8033a7e850b2",
              start_time: '2021-12-16 9:00',
              end_time: '2021-12-16 17:00',
              public: true,
            },
            {
              _id: ObjectId(),
              user_id: "61b711b7160d8033a7e850b2",
              start_time: '2021-12-17 9:00',
              end_time: '2021-12-17 17:00',
              public: false,
            },
          ],
        },
        {
          name: 'Desk 2'
        },
      ],
    },
    {
      name: 'Room 2',
      type: 'normal',
      floor: 1,
    }],
}]);
