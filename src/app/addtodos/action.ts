"use server"

import { prisma } from "@/utils/db"


export async function AddTodo(title: string, desc: string) {
    try {
        const new_todo = await prisma.todo.create({
            data: {
                title: title,
                description: desc
            }
        })
        return new_todo;
    }
    catch (e: any) {
        return { error: e.message }
    }
}