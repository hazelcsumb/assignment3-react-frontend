import { years, semesters } from "../../Constants";
const YearSemesterForm = (props) => {
  return (
    <form
      onSubmit={props.handleSubmit}
      style={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <label htmlFor="year">Year</label>
      <select
        name="year"
        id="year"
        required
        onChange={(newYear) => props.setYear(newYear.target.value)}
        value={props.year}
      >
        <option disabled value="Select a year">
          Select a year
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <label htmlFor="semester">Semester</label>
      <select
        name="semester"
        id="semester"
        required
        onChange={(newSemester) => props.setSemester(newSemester.target.value)}
        value={props.semester}
      >
        <option disabled value="Select a semester">
          Select a semester
        </option>
        {semesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>
      <button type="submit">{props.label}</button>
    </form>
  );
};

export default YearSemesterForm;
