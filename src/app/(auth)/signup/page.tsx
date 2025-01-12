"use client"
import { SignUp } from './action';

function Page() {


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.currentTarget);

    // Call the server-side `SignUp` action
    const response = await SignUp(formData);

    if(response?.error) alert(response.error);
    

    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col my-7 mx-7 p-6 justify-center items-center'>
          <div className=''>
              <label>
                Email:
              </label>
              <input name="email" type="email" required className='border border-slate-950 ms-3 rounded-2xl bg-slate-100 h-7 p-2' placeholder='Enter email'/>
            
          </div>
          <div className='mt-7'>
              <label>
                Password:
              </label>
              <input name="password" type="password" required className='border border-slate-950 ms-3 rounded-2xl bg-slate-100 h-7 p-2'  placeholder='password'/>

          </div>
          <button type="submit" className='bg-blue-400 mt-9 p-3 rounded-3xl'>Sign Up</button>
        </div> 
      </form>
    </div>
  );
}

export default Page;
