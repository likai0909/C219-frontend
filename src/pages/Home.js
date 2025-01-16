import { useEffect } from "react";
import WorkoutDetails from "../component/WorkoutDetails";
import WorkoutForm from "../component/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

function Home() {
  // const [workouts, setWorkouts] = useState(null); // local state
  const { workouts, dispatch } = useWorkoutContext(); // global context state

    useEffect(() => {
        const fetchWorkouts = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/workouts`
        );
        const json = await response.json(); 
        if (response.ok) {
            
            dispatch({ type: "SET_WORKOUTS", payload: json });
        }
        };

        fetchWorkouts();
    }, [dispatch]); 

    return (
        <div className="home">
        <div className="workouts">
            {workouts &&
            workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
        </div>
    );
    }

export default Home;
