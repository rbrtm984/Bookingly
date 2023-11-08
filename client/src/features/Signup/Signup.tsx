import React, { useEffect } from 'react'
import { fetchSignups, selectSignups, signupForRace } from './signupSlice'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { RootState } from '../../app/store';

interface Statuses {
    [key: string]: string;
  }

const statuses: Statuses = {
  Available: 'text-green-700 bg-green-50 ring-green-600/20',
  Full: 'text-red-700 bg-red-50 ring-red-600/10',
}

// Define interfaces for your clients and their invoices.
interface Status{
    date: string;
    dateTime: string;
    status: keyof Statuses; // Ensures status matches the keys of Statuses.
}

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const slots = useSelector(selectSignups);
  const maxRacersPerRace = 4

  let images = ['https://i.imgur.com/FPv5gVR.png', 'https://i.imgur.com/DCIgFpn.png', 'https://i.imgur.com/WiwY0bi.png'];

  const loading = useSelector((state: RootState) => state.signups.loading);
  const error = useSelector((state: RootState) => state.signups.error);

  useEffect(() => {
    dispatch(fetchSignups());
  }, []);

  const handleSignUp = (timeId: string, raceSlot: string, username: string) => {
    dispatch(signupForRace({ timeId, raceSlot, username }));
  }

  // console.log('slots', slots);
  // console.log('slots.time', slots.time);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div>
    <ul  id="Signup" role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      
      {Object.entries(slots.time).map(([timeId, races], timeIndex) => (
        
        <li key={timeId} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-neutral-100 p-6 justify-center">
            <img
                src={images[timeIndex% images.length]}
                // alt={`Time slot for ${timeId}`}
                className="h-auto w-3/4 flex-none bg-white object-cover"
              />
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            {Object.entries(races).map(([raceSlot, racers]) => (
               <div key={raceSlot} className="flex flex-col gap-y-2 py-3">
                  <dt className="text-gray-500 text-center">{raceSlot}</dt>
                  {racers.map((racer, racerIndex) => (
                    // <dd key={racerIndex} className="text-center rounded-sm text-gray-500">{racer}</dd>
                      <button
                                key={racerIndex}
                                type="button"
                                className="w-auto rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        {racer}
                      </button> 
                    ))}
                  {[...Array(maxRacersPerRace - racers.length)].map((_, index) => (
                    // <dd key={`empty-${index}`} className="text-center bg-green-200 rounded-sm text-gray-400 italic">Available</dd>
                    <button
                      type="button"
                      className="w-auto rounded-full bg-green-200 px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Available
                    </button>
                  ))}
                  <div className="px-6 py-3 flex justify-center">
                    <button
                        type="button"
                        className="ml-4 rounded-md bg-custom-turq px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => handleSignUp(timeId, raceSlot, 'Racing-Rita')}
                    >
                      Let's Kart!
                    </button>
                  </div>
                </div>
                
            )) }
          </dl>

        </li>
      ))}
    </ul>
    
    </div>
  )
}

export default Signup;