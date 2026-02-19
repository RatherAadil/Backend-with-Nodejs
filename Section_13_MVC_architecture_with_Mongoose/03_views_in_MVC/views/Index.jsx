import React from 'react';
import { Layout } from './Layout';

export default function Index({ todos }) {
  return (
    <Layout title='Todo App'>
      <form action='/todos' method='POST'>
        <label htmlFor='title'>Title: </label>
        <input type='text' id='title' name='title' required />
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.reverse().map(({ title, completed, _id }) => (
          <div className='todos' key={_id.toString()}>
            <input
              type='checkbox'
              name='completed'
              checked={completed}
              className='completed-checkbox'
              data-id={_id.toString()}
            />
            <li key={_id.toString()} className='items'>
              <span className={completed ? 'completed' : ''}>{title}</span>

              <button data-id={_id.toString()}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </Layout>
  );
}
