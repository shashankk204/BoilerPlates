import { prisma } from '@/utils/db'
import React from 'react'

async function page() {
    const data = await prisma.todo.findMany({})
    // console.log();
  return (
    <div className='flex-col  justify-center h-screen bg-slate-700'>
        {data.map((val)=>{
            return(
                    <div className='bg-slate-400' id={val.id.toString()}>
                        <div >
                            title:{val.title}
                        </div>
                        <div>
                            desc:{val.description}
                        </div>
                    </div>  
            )
        })}        
    </div>
  )
}

export default page
