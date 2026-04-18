const db = require('../config/db');
const { haversineDistance } = require('../middleware/validators');

// POST /addSchool
async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await db.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
    );

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
  } catch (err) {
    console.error('addSchool error:', err);
    return res.status(500).json({ success: false, error: 'Failed to add school' });
  }
}

// GET /listSchools?latitude=&longitude=
async function listSchools(req, res) {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const [schools] = await db.query('SELECT * FROM schools');

    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No schools found',
        count: 0,
        user_location: { latitude: userLat, longitude: userLon },
        data: [],
      });
    }

    // Attach distance and sort ascending
    const sorted = schools
      .map((school) => ({
        ...school,
        distance_km: parseFloat(
          haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      count: sorted.length,
      user_location: { latitude: userLat, longitude: userLon },
      data: sorted,
    });
  } catch (err) {
    console.error('listSchools error:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch schools' });
  }
}

module.exports = { addSchool, listSchools };