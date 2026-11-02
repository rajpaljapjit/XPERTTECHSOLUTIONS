CREATE TABLE IF NOT EXISTS availability (
  day_of_week TEXT NOT NULL UNIQUE,
  is_available INTEGER DEFAULT 0,
  start_time TEXT DEFAULT '10:00',
  end_time TEXT DEFAULT '15:00'
);

INSERT OR IGNORE INTO availability (day_of_week, is_available, start_time, end_time) VALUES
  ('Monday',    1, '10:00', '15:00'),
  ('Tuesday',   1, '10:00', '15:00'),
  ('Wednesday', 1, '10:00', '15:00'),
  ('Thursday',  0, '10:00', '15:00'),
  ('Friday',    0, '10:00', '15:00'),
  ('Saturday',  1, '10:00', '15:00'),
  ('Sunday',    1, '10:00', '15:00');
