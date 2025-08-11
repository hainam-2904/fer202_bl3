import React from 'react';

const CourseList = () => {
  const courses = ["React", "ReactNative", "NodeJs"];

  return (
    <div>
      <h2>Course names</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
