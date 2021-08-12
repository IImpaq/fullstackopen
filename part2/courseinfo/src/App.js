import React from "react";

const Header = ({text}) => {
  return <h1>{text}</h1>
};

const Title = ({text}) => {
  return <h2>{text}</h2>
};

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
};

const Content = ({parts}) => {
  return (
    <>
      {
        parts.map(part =>
          <Part
            key={part.id}
            part={part}
          />
        )
      }
    </>
  );
};

const Summary = ({parts}) => {
  return (
    <p>
      <strong>
         total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </strong>
    </p>
  );
};

const Course = ({course}) => {
  return (
    <div>
      <Title text={course.name} />
      <Content parts={course.parts} />
      <Summary parts={course.parts} />
    </div>
  );
}

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
  ];

  return (
    <div>
      <Header text="Web development curriculum" />
      {
        courses.map(course =>
          <Course 
            key={course.id}
            course={course} 
          />
        )
      }
    </div>
  );
};

export default App;
