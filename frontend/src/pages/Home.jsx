import React, { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }

        fetchWorkouts()
    }, [dispatch])

    return (
        <div className='min-h-screen bg-[#f1f1f1] pt-40 px-52 py-10 grid grid-cols-3 gap-10'>
            <div className='col-span-2 flex flex-col gap-4'>
                {workouts && workouts.map(workout => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <div><WorkoutForm /></div>
        </div>
    )
}

export default Home