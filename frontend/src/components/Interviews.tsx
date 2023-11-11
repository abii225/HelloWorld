import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
}

const Interviews = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const allCourses: Course[] = [
    { id: 1, title: 'NEM 111', description: 'Description for Course 1' },
    { id: 2, title: 'NEM 111', description: 'Description for Course 2' },
    // Add more courses as needed
  ];

  const inProgressCourses: Course[] = [
    { id: 3, title: '111', description: 'Description for Course 3' },
    { id: 4, title: ' 111', description: 'Description for Course 4' },
  ];

  const completedCourses: Course[] = [
    { id: 5, title: 'ggg 111', description: 'Description for Course 5' },
    { id: 6, title: 'NEM 111', description: 'Description for Course 6' },
  ];

  const renderCourseCards = (courses: Course[]) => {
    return courses.map((course) => (
      <div key={course.id} className="border p-4 mb-4 rounded-md" style={{width:"20rem"}} >
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p>{course.description}</p>
        <Link to="start_interview"><button className='startButton'>Start Interview</button></Link>
      </div>
    ));
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-10">
        <div className="mb-4">
          <ul className="flex">
            <li className={`mr-4 cursor-pointer ${selectedTab === 0 && 'border-b-2 border-teal-500'}`}>
              <div onClick={() => handleTabChange(0)}>All Courses</div>
            </li>
            <li className={`mr-4 cursor-pointer ${selectedTab === 1 && 'border-b-2 border-teal-500'}`}>
              <div onClick={() => handleTabChange(1)}>In Progress</div>
            </li>
            <li className={`cursor-pointer ${selectedTab === 2 && 'border-b-2 border-teal-500'}`}>
              <div onClick={() => handleTabChange(2)}>Completed</div>
            </li>
          </ul>
         
        </div>

        <div>
          {selectedTab === 0 && renderCourseCards(allCourses)}
          {selectedTab === 1 && renderCourseCards(inProgressCourses)}
          {selectedTab === 2 && renderCourseCards(completedCourses)}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
