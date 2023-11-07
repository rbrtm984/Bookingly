import React, { useEffect } from 'react'
import { fetchSignups, selectSignups } from './signupSlice'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

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
  
  interface Slot{
    race_id: number;
    name: string;
    status: Status;
  }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Signup() {
  const dispatch = useDispatch();
  // const slots = useSelector(selectSignups);
  const slots = {
    'race1': ['Katya', 'Rob', 'Brooke', 'Aaron'],
    'race2': ['Rita', 'Sohum', 'James', 'Chris'],
    'race3': ['Jake', 'Tommy', 'PK', 'Edmund']
  }
  const lunchImage = 'https://i.imgur.com/FPv5gVR.png'; // URL to your lunch image
  const dinnerImage = 'https://i.imgur.com/DCIgFpn.png'; // URL to your dinner image
  const eveningImage = 'https://i.imgur.com/WiwY0bi.png'; // URL to your evening image

  let images = [lunchImage, dinnerImage, eveningImage];

  const loading = useSelector((state: RootState) => state.signups.loading);
  const error = useSelector((state: RootState) => state.signups.error);

  // useEffect(() => {
  //   dispatch(fetchSignups());
  // }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {Object.entries(slots).map(([raceId, userIds], index) => (
        <li key={raceId} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-neutral-100 p-6">
            <img
                src={images[index % images.length]}
                // alt={`Time slot for ${}`}
                className="h-auto w-3/4 flex-none bg-white object-cover"
              />
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            {userIds.map((userId, i) => (
              <div key={userId} className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Slot {i + 1}</dt>
                <dd className="text-gray-700">
                  {/* Render user ID or additional details here */}
                  {userId}
                </dd>
              </div>
            ))}
          </dl>
          <div className="px-6 py-3 flex justify-start">
            <button
                type="button"
                className="ml-4 rounded-md bg-custom-turq px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Let's Kart!
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
