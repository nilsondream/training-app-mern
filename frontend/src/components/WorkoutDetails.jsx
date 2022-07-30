import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { RiCloseCircleFill } from 'react-icons/ri'

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <div className='py-7 px-10 flex items-start justify-between bg-white rounded hover:shadow-lg transition duration-500 ease-in-out'>
            <div className='flex flex-col items-start'>
                <h4 className='text-md text-indigo-600 font-bold pb-2 uppercase'>{workout.title}</h4>
                <p className='text-sm'><span className='font-bold'>Carga (kg): </span>{workout.load}</p>
                <p className='text-sm'><span className='font-bold'>Repeticiones: </span>{workout.reps}</p>
                <p className='text-sm py-1 px-2 mt-2 rounded bg-[#f1f1f1]'>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            </div>
            <div className='cursor-pointer text-3xl text-gray-300 hover:text-red-500 transition duration-300 ease-in-out' onClick={handleClick}><RiCloseCircleFill /></div>
        </div>
    )
}

export default WorkoutDetails