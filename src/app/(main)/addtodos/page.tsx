"use client"
import React from 'react'
import { AddTodo } from './action';

function page() {
  async function onclick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Type cast the form elements to HTMLInputElement
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const dec = (form.elements.namedItem('description') as HTMLInputElement).value;

   const data=await AddTodo(title,dec);

    console.log(data);
    
  }

  return (
    <div>
      <form onSubmit={onclick}>
        <input type="text" name='title' />
        <input type="text" name='description' />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default page;
