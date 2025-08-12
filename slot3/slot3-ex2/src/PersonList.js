import React, { useState, useMemo } from "react";
import { persons } from "./person";
import "./PersonList.css";

export default function PersonList() {
  const [sortAZ, setSortAZ] = useState(true);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [searchName, setSearchName] = useState("");

  // Yêu cầu 1: Sort theo firstName
  const sortedPersons = useMemo(() => {
    return [...persons].sort((a, b) => {
      return sortAZ
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    });
  }, [sortAZ]);

  // Yêu cầu 2: Lọc theo tuổi + skill
  const filteredByAgeAndSkill = useMemo(() => {
    return persons.filter((p) => {
      const inAgeRange =
        (!minAge || p.age >= parseInt(minAge)) &&
        (!maxAge || p.age <= parseInt(maxAge));
      const hasSkill = !skillFilter || p.skills.includes(skillFilter);
      return inAgeRange && hasSkill;
    });
  }, [minAge, maxAge, skillFilter]);

  // Lấy danh sách skill để làm dropdown
  const allSkills = useMemo(() => {
    const skills = persons.reduce((acc, p) => {
      acc.push(...p.skills);
      return acc;
    }, []);
    return [...new Set(skills)];
  }, []);

  // Yêu cầu 3: Bảng xếp hạng skill
  const skillRanking = useMemo(() => {
    const count = persons.reduce((acc, p) => {
      p.skills.forEach((skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});
    return Object.entries(count).sort((a, b) => b[1] - a[1]);
  }, []);

  // Yêu cầu 4: Tìm kiếm + Sort đa tiêu chí + Statistics
  const multiSorted = useMemo(() => {
    return persons
      .filter((p) =>
        `${p.firstName} ${p.lastName}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
      )
      .sort((a, b) => {
        if (a.isActive !== b.isActive) return b.isActive - a.isActive;
        if (a.age !== b.age) return a.age - b.age;
        return a.lastName.localeCompare(b.lastName);
      });
  }, [searchName]);

  const statistics = useMemo(() => {
    const total = multiSorted.length;
    const avgAge =
      total > 0
        ? (multiSorted.reduce((sum, p) => sum + p.age, 0) / total).toFixed(1)
        : 0;
    const activeCount = multiSorted.filter((p) => p.isActive).length;
    return { total, avgAge, activeCount };
  }, [multiSorted]);

  return (
    <div className="person-container">
      <h2>Exercise 2</h2>

      {/* Yêu cầu 1 */}
      <section>
        <h3>1. Sort First Name A→Z / Z→A</h3>
        <button onClick={() => setSortAZ(!sortAZ)}>
          Sort {sortAZ ? "Z→A" : "A→Z"}
        </button>
        <ul>
          {sortedPersons.map((p) => (
            <li key={p.id}>
              {p.firstName} {p.lastName} - {p.age} - {p.city} -{" "}
              {p.skills.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      {/* Yêu cầu 2 */}
      <section>
        <h3>2. Filter by Age & Skill</h3>
        Min Age:{" "}
        <input
          type="number"
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
        />
        Max Age:{" "}
        <input
          type="number"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
        />
        Skill:{" "}
        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        >
          <option value="">All</option>
          {allSkills.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
        <ul>
          {filteredByAgeAndSkill.length === 0 ? (
            <li>No found</li>
          ) : (
            filteredByAgeAndSkill.map((p) => (
              <li key={p.id}>
                {p.firstName} - {p.lastName} - {skillFilter || p.skills.join(", ")}
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Yêu cầu 3 */}
      <section>
        <h3>3. Skill Ranking</h3>
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {skillRanking.map(([skill, count], idx) => (
              <tr key={skill}>
                <td style={{ fontWeight: idx === 0 ? "bold" : "normal" }}>
                  {skill}
                </td>
                <td style={{ fontWeight: idx === 0 ? "bold" : "normal" }}>
                  {count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Yêu cầu 4 */}
      <section>
        <h3>4. Search + Multi-criteria Sort + Statistics</h3>
        <input
          type="text"
          placeholder="Search name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <ul>
          {multiSorted.map((p) => (
            <li key={p.id}>
              {p.firstName} {p.lastName} - {p.age} -{" "}
              {p.isActive ? "Active" : "Inactive"}
            </li>
          ))}
        </ul>
        <div className="stats">
          <p>Total: {statistics.total}</p>
          <p>Average Age: {statistics.avgAge}</p>
          <p>Active Count: {statistics.activeCount}</p>
        </div>
      </section>
    </div>
  );
}
