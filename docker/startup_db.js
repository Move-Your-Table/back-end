db.buildings.insert({
  name: 'Howest',
  address: 'Rijselstraat 5, 8000 Brugge',
  rooms: [
    {
      name: 'Room 1',
      type: 'normal',
      floor: 0,
      features: '',
      incidentReports: [
        {
          user_id: 1,
          message: 'Very nice',
        },
      ],
      desks: [
        {
          name: 'Desk 1',
          last_used: '2021-10-17 16:34',
          incidentReports: [
            {
              user_id: 1,
              message: 'Very nice',
            },
          ],
          bookings: [
            {
              user_id: 1,
              start_time: '2021-10-17 16:00',
              end_time: '2021-10-17 18:00',
              public: true,
            },
          ],
        },
      ],
    },
  ],
});

db.users.insert({
  username: 'Joe',
  email: 'joe@joemail.com',
  phonenumber: '123456789',
  role: 'admin'
});