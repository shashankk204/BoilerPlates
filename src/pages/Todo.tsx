import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface Todo {
    id?:string
    title: string;
    description: string;
}

async function FetchTodo() {
    const data=await axios.get<Todo[]>('https://677e8bb694bde1c1252c66ec.mockapi.io/Todo')
    return data.data;
}

function TodoApp() {
    const {data,isLoading,isError,error}=useQuery({
        queryFn:FetchTodo,
        queryKey:["Todos"]      
    })
    const queryClient=useQueryClient();

    
    if(isError) return<>{error.message}</>;
    
    
    
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    
    const handleAddTodo = () => {
        
            const newTodo: Todo = { title: todoTitle, description: todoDescription };
            setTodoTitle('');
            setTodoDescription('');
            return axios.post('https://677e8bb694bde1c1252c66ec.mockapi.io/Todo',newTodo)
         

    };

    const {mutate:PostTodo}=useMutation({
        mutationFn:handleAddTodo,
        onSuccess(newdata, _variables, _context) {
            // @ts-ignore
            // queryClient.invalidateQueries(['Todos'])
            queryClient.setQueryData(["Todos"],(oldData:any)=>{
                console.log([...oldData,newdata.data]
                );
                
                return [
                    ...oldData ,
                    newdata.data
                ]
            })
        },



        // these are used to do optimistic updates


        // onMutate:async (newTodo)=>{
        //     // @ts-ignore
        //     await queryClient.cancelQueries(["Todos"])
        //     const prevTodos=queryClient.getQueryData(["Todos"]);
        //     queryClient.setQueryData(["Todos"],()=>{})
        //     return {prevTodos};
        // }
        // onError:(_error,_post,context)=>{
        //     queryClient.setQueryData(["Todos"],context.prevTodos)
        // }
        // ,
        // onSettled(data, error, variables, context) {
        //     queryClient.invalidateQueries(["Todos"]);
        // },

    })
    
    const handleDeleteTodo = (id: string) => {
        return axios.delete(`https://677e8bb694bde1c1252c66ec.mockapi.io/Todo/${id}`)

    };
    const {mutate:DeleteTodo}=useMutation({
        mutationFn:handleDeleteTodo,
        onSuccess(_data, _variables, _context) {
            // @ts-ignore
            queryClient.invalidateQueries(['Todos'])
        },
    })




    return (
        <div
            className="h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[80vh] flex flex-col">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    Todo App
                </h1>
                <div className="flex flex-col gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <textarea
                        placeholder="Enter description"
                        value={todoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                        className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                        disabled={!(todoTitle.trim() && todoDescription.trim())}
                        onClick={()=>{PostTodo()}}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-900"
                    >
                        Add Todo
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <ul className="space-y-4">
                        {isLoading?<>Loading</>:data?.map((e) => (
                            <li
                                key={e.id}
                                className="p-4 bg-gray-100 rounded shadow"
                            >
                                <h2
                                    className="text-lg font-bold truncate"
                                    title={e.title}
                                >
                                    {e.title}
                                </h2>
                                <p
                                    className="text-gray-600 truncate"
                                    title={e.description}
                                >
                                    {e.description}
                                </p>
                                <button
                                    onClick={() => DeleteTodo(e.id?.toString()||"")}
                                    className="mt-2 text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
