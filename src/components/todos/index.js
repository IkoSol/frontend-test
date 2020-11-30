import React, {useState, useEffect} from 'react';
import '../styles/todos.css'

const Todos = ({ data }) => {
  const [groupedTasks, setGroupedTasks] = useState()
  
  useEffect(() => {
    if (data!== null) {
      setGroupedTasks(groupBy(data, 'userId'))
    }
  }, [data])

  const handleCompleteTask = (todo, index, i) => {
    let newArr = [...groupedTasks]
    newArr[index][i]['completed'] = !todo.completed
    setGroupedTasks(newArr)
  }

  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, []);
  }

  const generateTables = groupedTasks&&groupedTasks.map( (todos, index) => {
    if (index === 0) return null
    return (
      <table>
        <thead>
          <tr>
            <th>{`User ID ${index} tasks`}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos&&todos.map( (todo, i) => (
            <tr key={i}>
              <td 
                style={{
                  textDecoration: !todo.completed ? 'none' : 'line-through',
                  backgroundColor: !todo.completed ? '' : '#72E37E',
                  color: !todo.completed ? '' : '#028310'
                }}
              >{todo.title}</td>
              <td
                style={{
                  backgroundColor: !todo.completed ? '' : '#72E37E'
                }}
              >
                <button type="button" onClick={() => handleCompleteTask(todo, index, i)}>
                  {!todo.completed ? 'Complete task' : 'Mark as incomplete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  })

  return (
    <div className="body">
      {generateTables}
    </div>
  );
};

export default Todos;