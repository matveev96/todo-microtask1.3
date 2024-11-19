import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType} from './App';
import {useAutoAnimate} from "@formkit/auto-animate/react";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    children?:React.ReactNode
}

export const Todolist:React.FC<PropsType>=({children, ...props}) =>{
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    let onChangeRef = useRef<HTMLInputElement>(null)

    const addTaskHandler = () => {
        if(onChangeRef.current) {
            props.addTask(onChangeRef.current.value);
            onChangeRef.current.value = "";
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                 ref={onChangeRef}
                 onKeyPress={onKeyPressHandler}
             />
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul ref={listRef}>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
        {children}
    </div>
}

