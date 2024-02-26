const QUERY = {
  SELECT_STUDENTS: "SELECT * FROM students ORDER BY created_at DESC LIMIT 100",
  SELECT_STUDENT: "SELECT * FROM students WHERE id = ?",
  CREATE_STUDENT:
    "UNSERT INTO students(first_name, last_name, email, phone, address, image_url) VALUES (?, ?, ?, ?, ?, ?)",
  UPDATE_STUDENT:
    "UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, image_url = ? WHERE id = ?",
  DELETE_STUDENT: "DELETE FROM students WHERE id = ?",
};

export default QUERY;
