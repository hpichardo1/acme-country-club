const Sequelize = require('sequelize')
const {INTEGER, DATE, STRING, UUID, UUIDV4} = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_country_club')

const  Faciliities = conn.define('facilities', {
  id: {
    type: UUID,
    primaryKey: true, 
    defaultValues: UUIDV4
  },
  fac_name: {
    type: STRING(100),
    allowNull: false
  }
})

const  Member = conn.define('members', {
  id: {
    type: UUID,
    primaryKey: true, 
    defaultValues: UUIDV4
  },
  first_name: {
    type: STRING(20),
    allowNull: false
  }
})

const  Booking = conn.define('bookings', {
  id: {
    type: INTEGER,
    primaryKey: true, 
  },
  // startTime: {
  //   type: DATE, 
  //   allowNull: false
  // }, 
  // endTime: {
  //   type: DATE, 
  //   allowNull: false
  // }
})

Member.belongsTo(Member, {as: 'sponsor'})// creates foreign key 
Booking.belongsTo(Faciliities)
Booking.belongsTo(Member, {as: 'bookedBy'})

const membersData = ['moe', 'lucy', 'larry', 'ethyl'];
const facilitiesData = ['tennis', 'ping-pong', 'raquet-ball', 'bowling'];



const syncAndSeed = async() => {
  try{
    await conn.sync({force: true})
    // await conn.authenticate();
    const members = await Promise.all(membersData.map(name => Member.create({first_name: name}))) 

  }
  catch(error){
    console.log(error)
  }
}

module.exports = {
  conn, 
  syncAndSeed,
  models: {
    Faciliities, 
    Member, 
    Booking
  }
}