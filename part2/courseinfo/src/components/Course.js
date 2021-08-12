import React from "react"

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

  export default Course;